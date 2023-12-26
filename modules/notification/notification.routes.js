
const express = require('express');

const notificationRouter = express.Router();

const notificationController = require('./notification.controller');

const { paramsValidator } = require('../../utils/params-validator');

/**
 * notification api routes
 *
 */
notificationRouter.get('/', [ ],  notificationController.list);
notificationRouter.post('/', [], notificationController.store);
notificationRouter.get('/:id', [ paramsValidator ],  notificationController.get);
notificationRouter.put('/:id', [ paramsValidator ], notificationController.update);
notificationRouter.delete('/:id', [ paramsValidator ], notificationController.remove);

module.exports = notificationRouter;
