
const express = require('express');

const userRouter = express.Router();

const userController = require('./user.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * user api routes
 *
 */
userRouter.get('/', [ ],  userController.list);
userRouter.post('/', [], userController.store);
userRouter.get('/:id', [ paramsValidator ],  userController.get);
userRouter.put('/:id', [ paramsValidator ], userController.update);
userRouter.delete('/:id', [ paramsValidator ], userController.remove);

module.exports = userRouter;
