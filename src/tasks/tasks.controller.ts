import { validationResult } from 'express-validator';
import { AppDataSource } from './../../index';
import { Task } from "./tasks.entity";
import { instanceToPlain, plainToInstance } from 'class-transformer'; //convert instance of class into plain object
import { Request, Response} from 'express';
import { UpdateResult } from 'typeorm';

class TasksController {
    public async getAll(req: Request, res:Response): Promise<Response> {
        //variable to hold all task
        let allTasks: Task[];

        try {
            //fetch all tasks
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    //date as ascending order
                    date: 'ASC'
                }
            }); //return class instance, need to convert to object

            allTasks = instanceToPlain(allTasks) as Task[]
            return res.json(allTasks).status(200)

        } catch (_errors) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }

    }

    // Method for creating tasks
    public async create(req: Request, res: Response):Promise<Response> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        // save data to database with TypeORM
        // Create new task instance (TypeORM always take instance of entity)
        const newTask = new Task();

        // Add the required properties to the task object
        newTask.title = req.body.title;
        newTask.date = req.body.date;
        newTask.description = req.body.description;
        newTask.priority = req.body.priority;
        newTask.status = req.body.status;

        // Add the new task to the database
        let createdTask: Task;

        try {
            createdTask = await AppDataSource.getRepository(Task).save(newTask);

            // Convert task instance to object
            createdTask = instanceToPlain(createdTask) as Task;
            return res.json(createdTask).status(201);
        } catch (_error) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }
    }

    // Method for updating tasks
    public async update(req:Request, res:Response): Promise<Response> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        // find and check if task exists
        let task: Task | null;

        try {
            task = await AppDataSource.getRepository(
                Task
                ).findOne({where: {id: req.body.id}})
        } catch (errors) {
            return res
            .json(errors)
            .status(500)
        }

        // if task does not exist, return err
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist',
            });
        }

        // declare a variable for updateTask
        let updateTask: UpdateResult

        // update the task
        try {
            updateTask = await AppDataSource.getRepository(
                Task
                ).update(
                    req.body.id,
                    plainToInstance(Task, {
                    status: req.body.status
                }//partial instance
                )
            );
            // convert the updateTask and return
            updateTask = await instanceToPlain(updateTask) as UpdateResult;

            return res.json(updateTask).status(200);
        } catch (_error) {
            return res.json({error: 'Internal Server Error'}).status(500);
        }

    }
}

export const taskController = new TasksController();