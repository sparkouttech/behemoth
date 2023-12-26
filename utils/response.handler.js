/**
 * 
 * @param {*} res 
 * @param {*} data 
 * @param {*} statusCode 
 * @returns {Object} 
 */
function sendSuccessResponse(res, { data, message, statusCode }) {
    return res.status(statusCode || 200).json({
        status: true,
        message: message || 'success response',
        data: data || {},
    });
}

/**
 * 
 * @param {*} res 
 * @param {*} error 
 * @param {*} statusCode 
 * @returns {Object} 
 */
function sendErrorResponse(res, { error, message, statusCode }) {
    return res.status(statusCode || 500).json({
        status: false,
        message: message || 'error occurs',
        error: error || {}
    });
}

/**
 * 
 * @param {*} res 
 * @param {*} errors 
 * @param {*} statusCode 
 * @returns {Object} 
 */
function sendValidationError(res, { error, message, statusCode }) {
    return res.status(statusCode || 400).json({
        status: false,
        message: message || 'Validation error',
        data: error || {}
    });
}

module.exports = {
    sendSuccessResponse,
    sendErrorResponse,
    sendValidationError,
};
  