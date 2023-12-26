
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Task = require('./task.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        if (task) {
            return sendSuccessResponse(res, { data: task, message: "Task created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: task, message: "Unable to create Task", statusCode: 400 });
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
        const task = await Task.findById(req.params.id);
        if (task) {
            return sendSuccessResponse(res, { data: task, message: "Task details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: task, message: "Task not found", statusCode: 400 });
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
        const task = await Task.paginate({},req.query);
        return sendSuccessResponse(res, { data: task, message: "Task list retrieved Successfully", statusCode: 200 });
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
        const task = await Task.findByIdAndDelete(req.params.id)
        if (task) {
            return sendSuccessResponse(res, { data: task, message: "Task details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: task, message: "Failed to delete task", statusCode: 400 });
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
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (task) {
            return sendSuccessResponse(res, { data: task, message: "Task details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: task, message: "Failed to update task details", statusCode: 400 });
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
