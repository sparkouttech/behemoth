
const express = require('express');

const scopeRouter = express.Router();

const scopeController = require('./scope.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * scope api routes
 *
 */
scopeRouter.get('/', [ ],  scopeController.list);
scopeRouter.post('/', [], scopeController.store);
scopeRouter.get('/:id', [ paramsValidator ],  scopeController.get);
scopeRouter.put('/:id', [ paramsValidator ], scopeController.update);
scopeRouter.delete('/:id', [ paramsValidator ], scopeController.remove);

module.exports = scopeRouter;
