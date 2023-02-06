"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const tasks_controller_1 = require("./tasks.controller");
const express_1 = require("express");
const task_validator_1 = require("./task.validator");
exports.tasksRouter = (0, express_1.Router)();
// Create a default route
exports.tasksRouter.get('/tasks', tasks_controller_1.taskController.getAll);
exports.tasksRouter.post('/tasks', task_validator_1.createValidator, //middleware
tasks_controller_1.taskController.create);
exports.tasksRouter.put('/tasks', task_validator_1.updateValidator, //middleware
tasks_controller_1.taskController.update);
