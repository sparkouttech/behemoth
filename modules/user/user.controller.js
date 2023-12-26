
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const User = require('./user.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const user = await User.create(req.body)
        if (user) {
            return sendSuccessResponse(res, { data: user, message: "User created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: user, message: "Unable to create User", statusCode: 400 });
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
        const user = await User.findById(req.params.id);
        if (user) {
            return sendSuccessResponse(res, { data: user, message: "User details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: user, message: "User not found", statusCode: 400 });
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
        const user = await User.paginate({},req.query);
        return sendSuccessResponse(res, { data: user, message: "User list retrieved Successfully", statusCode: 200 });
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
        const user = await User.findByIdAndDelete(req.params.id)
        if (user) {
            return sendSuccessResponse(res, { data: user, message: "User details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: user, message: "Failed to delete user", statusCode: 400 });
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (user) {
            return sendSuccessResponse(res, { data: user, message: "User details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: user, message: "Failed to update user details", statusCode: 400 });
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
