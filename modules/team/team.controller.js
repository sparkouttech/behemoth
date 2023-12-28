
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response.handler");
const Team = require('./team.model');

/**
 * @author Nilajs
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const store = async (req, res) => {
    try {
        const team = await Team.create(req.body)
        if (team) {
            return sendSuccessResponse(res, { data: team, message: "Team created Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: team, message: "Unable to create Team", statusCode: 400 });
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
 * @returns 
 */
const get = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (team) {
            return sendSuccessResponse(res, { data: team, message: "Team details retrieved Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: team, message: "Team not found", statusCode: 400 });
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
 * @returns 
 */
const list = async (req, res) => {
    try {
        if (req.query.select) {
            req.query.select = req.query.select.replace(',', ' '); 
        }
        if (req.query.all) {
            const team = await Team.find({});//.populate('users');
            return sendSuccessResponse(res, { data: team, message: "Team list retrieved Successfully", statusCode: 200 });
        } else {
            const team = await Team.paginate({},req.query);
            return sendSuccessResponse(res, { data: team, message: "Team list retrieved Successfully", statusCode: 200 });
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
 * @returns 
 */
const remove = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id)
        if (team) {
            return sendSuccessResponse(res, { data: team, message: "Team details deleted Successfully", statusCode: 200 });
        } else {
            return sendErrorResponse(res, { data: team, message: "Failed to delete team", statusCode: 400 });
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
 * @returns 
 */
const update = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (team) {
            return sendSuccessResponse(res, { data: team, message: "Team details updated Successfully", statusCode: 200 });
        } else {
            sendErrorResponse(res, { data: team, message: "Failed to update team details", statusCode: 400 });
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
