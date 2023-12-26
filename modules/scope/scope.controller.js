
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Scope = require('./scope.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const scope = await Scope.create(req.body)
        if (scope) {
            return sendSuccessResponse(res, { data: scope, message: "Scope created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: scope, message: "Unable to create Scope", statusCode: 400 });
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
        const scope = await Scope.findById(req.params.id);
        if (scope) {
            return sendSuccessResponse(res, { data: scope, message: "Scope details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: scope, message: "Scope not found", statusCode: 400 });
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
        const scope = await Scope.paginate({},req.query);
        return sendSuccessResponse(res, { data: scope, message: "Scope list retrieved Successfully", statusCode: 200 });
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
        const scope = await Scope.findByIdAndDelete(req.params.id)
        if (scope) {
            return sendSuccessResponse(res, { data: scope, message: "Scope details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: scope, message: "Failed to delete scope", statusCode: 400 });
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
        const scope = await Scope.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (scope) {
            return sendSuccessResponse(res, { data: scope, message: "Scope details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: scope, message: "Failed to update scope details", statusCode: 400 });
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
