
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const File = require('./file.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const file = await File.create(req.body)
        if (file) {
            return sendSuccessResponse(res, { data: file, message: "File created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: file, message: "Unable to create File", statusCode: 400 });
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
        const file = await File.findById(req.params.id);
        if (file) {
            return sendSuccessResponse(res, { data: file, message: "File details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: file, message: "File not found", statusCode: 400 });
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
        const file = await File.paginate({},req.query);
        return sendSuccessResponse(res, { data: file, message: "File list retrieved Successfully", statusCode: 200 });
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
        const file = await File.findByIdAndDelete(req.params.id)
        if (file) {
            return sendSuccessResponse(res, { data: file, message: "File details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: file, message: "Failed to delete file", statusCode: 400 });
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
        const file = await File.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (file) {
            return sendSuccessResponse(res, { data: file, message: "File details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: file, message: "Failed to update file details", statusCode: 400 });
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
