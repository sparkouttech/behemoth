
const express = require('express');

const commentfileRouter = express.Router();

const commentfileController = require('./commentfile.controller');

const { paramsValidator } = require('../../../utils/params-validator');

/**
 * commentfile api routes
 *
 */
commentfileRouter.get('/', [ ],  commentfileController.list);
commentfileRouter.post('/', [], commentfileController.store);
commentfileRouter.get('/:id', [ paramsValidator ],  commentfileController.get);
commentfileRouter.put('/:id', [ paramsValidator ], commentfileController.update);
commentfileRouter.delete('/:id', [ paramsValidator ], commentfileController.remove);

module.exports = commentfileRouter;
