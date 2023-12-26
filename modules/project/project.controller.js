
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Project = require('./project.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} 
 */
const store = async (req, res) => {
    try {
        const project = await Project.create(req.body)
        if (project) {
            return sendSuccessResponse(res, { data: project, message: "Project created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: project, message: "Unable to create Project", statusCode: 400 });
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
        const project = await Project.findById(req.params.id);
        if (project) {
            return sendSuccessResponse(res, { data: project, message: "Project details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: project, message: "Project not found", statusCode: 400 });
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
        const project = await Project.paginate({},req.query);
        return sendSuccessResponse(res, { data: project, message: "Project list retrieved Successfully", statusCode: 200 });
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
        const project = await Project.findByIdAndDelete(req.params.id)
        if (project) {
            return sendSuccessResponse(res, { data: project, message: "Project details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: project, message: "Failed to delete project", statusCode: 400 });
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
        const project = await Project.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (project) {
            return sendSuccessResponse(res, { data: project, message: "Project details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: project, message: "Failed to update project details", statusCode: 400 });
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
