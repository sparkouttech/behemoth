
const express = require('express');

const projectRouter = express.Router();

const projectController = require('./project.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * project api routes
 *
 */
projectRouter.get('/', [ ],  projectController.list);
projectRouter.post('/', [], projectController.store);
projectRouter.get('/:id', [ paramsValidator ],  projectController.get);
projectRouter.put('/:id', [ paramsValidator ], projectController.update);
projectRouter.delete('/:id', [ paramsValidator ], projectController.remove);

module.exports = projectRouter;
