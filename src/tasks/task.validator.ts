import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator:ValidationChain[] = [
    body('title')
    .not()
    .isEmpty()
    //title is required.
    .withMessage('The task title is required.')
    .trim()
    .isString()
    .withMessage('Title needs to be in text format'),

    body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required.')
    .isString()
    .withMessage('Date needs to be in valid format'),

    body('description')
    .trim()
    .isString()
    .withMessage('description needs to be in text format'),

    body('priority')
    .trim()
    .isIn([Priority.high, Priority.low, Priority.medium])
    .withMessage('Priority can only be normal, hight or low'),

    body('status')
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('status can only be normal, hight or low')
];

export const updateValidator = [
    body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required')
    .trim()
    .isString()
    .withMessage('ID needs to be a valid uuid format'),

    body('status')
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage('status can only be normal, hight or low')
];