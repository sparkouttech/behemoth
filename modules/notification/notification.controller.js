
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Notification = require('./notification.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const notification = await Notification.create(req.body)
        if (notification) {
            return sendSuccessResponse(res, { data: notification, message: "Notification created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: notification, message: "Unable to create Notification", statusCode: 400 });
        }
    } catch (error) {
        console.log('Error:', error);
        return sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const get = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            return sendSuccessResponse(res, { data: notification, message: "Notification details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: notification, message: "Notification not found", statusCode: 400 });
        }
    } catch (error) {
        console.log('Error:', error);
        sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const list = async (req, res) => {
    try {
        if (req.query.select) {
            req.query.select = req.query.select.replace(',', ' '); 
        }
        const notification = await Notification.paginate({},req.query);
        return sendSuccessResponse(res, { data: notification, message: "Notification list retrieved Successfully", statusCode: 200 });
    } catch (error) {
        console.log('Error:', error);
        sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const remove = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id)
        if (notification) {
            return sendSuccessResponse(res, { data: notification, message: "Notification details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: notification, message: "Failed to delete notification", statusCode: 400 });
        }
    } catch (error) {
        console.log('Error:', error);
        return sendErrorResponse(res, { error: error });
    }
}

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const update = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (notification) {
            return sendSuccessResponse(res, { data: notification, message: "Notification details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: notification, message: "Failed to update notification details", statusCode: 400 });
        }
    } catch (error) {
        console.log('Error:', error);
        sendErrorResponse(res, { error: error });
    }
}


module.exports = {
    store,
    get,
    list,
    remove,
    update
}
