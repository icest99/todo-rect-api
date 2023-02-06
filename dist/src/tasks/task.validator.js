"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidator = exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Priority_1 = require("../enums/Priority");
const Status_1 = require("../enums/Status");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        //title is required.
        .withMessage('The task title is required.')
        .trim()
        .isString()
        .withMessage('Title needs to be in text format'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('Date is required.')
        .isString()
        .withMessage('Date needs to be in valid format'),
    (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('description needs to be in text format'),
    (0, express_validator_1.body)('priority')
        .trim()
        .isIn([Priority_1.Priority.high, Priority_1.Priority.low, Priority_1.Priority.medium])
        .withMessage('Priority can only be normal, hight or low'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([Status_1.Status.completed, Status_1.Status.inProgress, Status_1.Status.todo])
        .withMessage('status can only be normal, hight or low')
];
exports.updateValidator = [
    (0, express_validator_1.body)('id')
        .not()
        .isEmpty()
        .withMessage('The task id is required')
        .trim()
        .isString()
        .withMessage('ID needs to be a valid uuid format'),
    (0, express_validator_1.body)('status')
        .isIn([Status_1.Status.completed, Status_1.Status.inProgress, Status_1.Status.todo])
        .withMessage('status can only be normal, hight or low')
];
