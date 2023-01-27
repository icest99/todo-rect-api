import { taskController } from './tasks.controller';
import { Router } from 'express';
import { createValidator, updateValidator } from './task.validator';

export const tasksRouter: Router = Router();

// Create a default route
tasksRouter.get('/tasks', taskController.getAll)

tasksRouter.post('/tasks',
    createValidator, //middleware
    taskController.create
)

tasksRouter.put('/tasks',
    updateValidator, //middleware
    taskController.update
)