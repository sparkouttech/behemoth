
const { sendSuccessResponse, sendErrorResponse } = require("../../../utils/response.handler");
const Commentfile = require('./commentfile.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const commentfile = await Commentfile.create(req.body)
        if (commentfile) {
            return sendSuccessResponse(res, { data: commentfile, message: "Commentfile created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: commentfile, message: "Unable to create Commentfile", statusCode: 400 });
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
        const commentfile = await Commentfile.findById(req.params.id);
        if (commentfile) {
            return sendSuccessResponse(res, { data: commentfile, message: "Commentfile details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: commentfile, message: "Commentfile not found", statusCode: 400 });
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
        const commentfile = await Commentfile.paginate({},req.query);
        return sendSuccessResponse(res, { data: commentfile, message: "Commentfile list retrieved Successfully", statusCode: 200 });
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
        const commentfile = await Commentfile.findByIdAndDelete(req.params.id)
        if (commentfile) {
            return sendSuccessResponse(res, { data: commentfile, message: "Commentfile details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: commentfile, message: "Failed to delete commentfile", statusCode: 400 });
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
        const commentfile = await Commentfile.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (commentfile) {
            return sendSuccessResponse(res, { data: commentfile, message: "Commentfile details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: commentfile, message: "Failed to update commentfile details", statusCode: 400 });
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
