
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Role = require('./role.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const role = await Role.create(req.body)
        if (role) {
            return sendSuccessResponse(res, { data: role, message: "Role created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: role, message: "Unable to create Role", statusCode: 400 });
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
        const role = await Role.findById(req.params.id);
        if (role) {
            return sendSuccessResponse(res, { data: role, message: "Role details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: role, message: "Role not found", statusCode: 400 });
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
        if (req.query.all) {
            const role = await Role.find({}).populate('scopes');
            return sendSuccessResponse(res, { data: role, message: "Role list retrieved Successfully", statusCode: 200 });
        } else {
            const role = await Role.paginate({},req.query);
            return sendSuccessResponse(res, { data: role, message: "Role list retrieved Successfully", statusCode: 200 });
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
const remove = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id)
        if (role) {
            return sendSuccessResponse(res, { data: role, message: "Role details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: role, message: "Failed to delete role", statusCode: 400 });
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
        const role = await Role.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (role) {
            return sendSuccessResponse(res, { data: role, message: "Role details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: role, message: "Failed to update role details", statusCode: 400 });
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
