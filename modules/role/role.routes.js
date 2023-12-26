
const express = require('express');

const roleRouter = express.Router();

const roleController = require('./role.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * role api routes
 *
 */
roleRouter.get('/', [ ],  roleController.list);
roleRouter.post('/', [], roleController.store);
roleRouter.get('/:id', [ paramsValidator ],  roleController.get);
roleRouter.put('/:id', [ paramsValidator ], roleController.update);
roleRouter.delete('/:id', [ paramsValidator ], roleController.remove);

module.exports = roleRouter;
