
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Comment = require('./comment.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const comment = await Comment.create(req.body)
        if (comment) {
            return sendSuccessResponse(res, { data: comment, message: "Comment created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: comment, message: "Unable to create Comment", statusCode: 400 });
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
        const comment = await Comment.findById(req.params.id);
        if (comment) {
            return sendSuccessResponse(res, { data: comment, message: "Comment details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: comment, message: "Comment not found", statusCode: 400 });
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
        const comment = await Comment.paginate({},req.query);
        return sendSuccessResponse(res, { data: comment, message: "Comment list retrieved Successfully", statusCode: 200 });
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
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if (comment) {
            return sendSuccessResponse(res, { data: comment, message: "Comment details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: comment, message: "Failed to delete comment", statusCode: 400 });
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
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (comment) {
            return sendSuccessResponse(res, { data: comment, message: "Comment details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: comment, message: "Failed to update comment details", statusCode: 400 });
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
