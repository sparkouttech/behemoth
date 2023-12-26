
const express = require('express');

const fileRouter = express.Router();

const fileController = require('./file.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * file api routes
 *
 */
fileRouter.get('/', [ ],  fileController.list);
fileRouter.post('/', [], fileController.store);
fileRouter.get('/:id', [ paramsValidator ],  fileController.get);
fileRouter.put('/:id', [ paramsValidator ], fileController.update);
fileRouter.delete('/:id', [ paramsValidator ], fileController.remove);

module.exports = fileRouter;
