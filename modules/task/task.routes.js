
const express = require('express');

const taskRouter = express.Router();

const taskController = require('./task.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * task api routes
 *
 */
taskRouter.get('/', [ ],  taskController.list);
taskRouter.post('/', [], taskController.store);
taskRouter.get('/:id', [ paramsValidator ],  taskController.get);
taskRouter.put('/:id', [ paramsValidator ], taskController.update);
taskRouter.delete('/:id', [ paramsValidator ], taskController.remove);

module.exports = taskRouter;
