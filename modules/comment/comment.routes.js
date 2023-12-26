
const express = require('express');

const commentRouter = express.Router();

const commentController = require('./comment.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * comment api routes
 *
 */
commentRouter.get('/', [ ],  commentController.list);
commentRouter.post('/', [], commentController.store);
commentRouter.get('/:id', [ paramsValidator ],  commentController.get);
commentRouter.put('/:id', [ paramsValidator ], commentController.update);
commentRouter.delete('/:id', [ paramsValidator ], commentController.remove);

module.exports = commentRouter;
