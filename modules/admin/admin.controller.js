
const { sendSuccessResponse, sendErrorResponse } = require('../../utils/response.handler');
const Admin = require('./admin.model');
const bcrypt = require('bcrypt');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    const admin = await Admin.findOne({email: req.body.email});
    if (admin) {
        const match = await bcrypt.compare(req.body.password, admin.password);
        if (match) {
            return sendSuccessResponse(res, { data: admin });
        } else {
            return sendErrorResponse(res, { message : 'Wrong password, try again' , statusCode: 400 });
        }
    } else {
        return sendErrorResponse(res, { message : 'Email not exists' , statusCode: 400 });
    }
}

const seedAdminCredentials = async () => {
    const admin = await Admin.findOne({});
    if (!admin) {
        const _admin = new Admin({
            name: 'admin',
            email: 'admin@sparkouttech.com', 
            password: '12345678'
        });
        _admin.save();
    }
}

module.exports = {
    login,
    seedAdminCredentials
}