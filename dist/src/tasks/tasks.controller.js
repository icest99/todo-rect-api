"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("./../../index");
const tasks_entity_1 = require("./tasks.entity");
const class_transformer_1 = require("class-transformer"); //convert instance of class into plain object
class TasksController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //variable to hold all task
            let allTasks;
            try {
                //fetch all tasks
                allTasks = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).find({
                    order: {
                        //date as ascending order
                        date: 'ASC'
                    }
                }); //return class instance, need to convert to object
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                return res.json(allTasks).status(200);
            }
            catch (_errors) {
                return res.json({ error: 'Internal Server Error' }).status(500);
            }
        });
    }
    // Method for creating tasks
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            // save data to database with TypeORM
            // Create new task instance (TypeORM always take instance of entity)
            const newTask = new tasks_entity_1.Task();
            // Add the required properties to the task object
            newTask.title = req.body.title;
            newTask.date = req.body.date;
            newTask.description = req.body.description;
            newTask.priority = req.body.priority;
            newTask.status = req.body.status;
            // Add the new task to the database
            let createdTask;
            try {
                createdTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).save(newTask);
                // Convert task instance to object
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (_error) {
                return res.json({ error: 'Internal Server Error' }).status(500);
            }
        });
    }
    // Method for updating tasks
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            // find and check if task exists
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({ where: { id: req.body.id } });
            }
            catch (errors) {
                return res
                    .json(errors)
                    .status(500);
            }
            // if task does not exist, return err
            if (!task) {
                return res.status(404).json({
                    error: 'The task with given ID does not exist',
                });
            }
            // declare a variable for updateTask
            let updateTask;
            // update the task
            try {
                updateTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).update(req.body.id, (0, class_transformer_1.plainToInstance)(tasks_entity_1.Task, {
                    status: req.body.status
                } //partial instance
                ));
                // convert the updateTask and return
                updateTask = (yield (0, class_transformer_1.instanceToPlain)(updateTask));
                return res.json(updateTask).status(200);
            }
            catch (_error) {
                return res.json({ error: 'Internal Server Error' }).status(500);
            }
        });
    }
}
exports.taskController = new TasksController();
