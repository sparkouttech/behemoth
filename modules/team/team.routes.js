
const express = require('express');

const teamRouter = express.Router();

const teamController = require('./team.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * team api routes
 *
 */
teamRouter.get('/', [ ],  teamController.list);
teamRouter.post('/', [], teamController.store);
teamRouter.get('/:id', [ paramsValidator ],  teamController.get);
teamRouter.put('/:id', [ paramsValidator ], teamController.update);
teamRouter.delete('/:id', [ paramsValidator ], teamController.remove);

module.exports = teamRouter;
