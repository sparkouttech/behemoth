const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');
const env = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Admin Schema
 * @created_at Sat Dec 23 2023 12:36:33 GMT+0530 (India Standard Time)
 * @description Admin model
 */
const adminSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },
    password: {
      type: String,
      unique: true,
      required: true
    },
    authentication_token: { 
      type: String, 
      unique: true 
    },
    status: {
      type: Number,
      default: 1
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
  versionKey: false,
});

adminSchema.index({ email: 1 });

adminSchema.pre('save', async function (next) {
    try {
      const obj = { ...this }
      this.authentication_token = jwt.sign({email: obj._doc.email, _id: obj._doc._id}, env.JWT_SECRET);
      this.password = await bcrypt.hash(this.password, Number(env.BCRYPT_SALT_ROUND)); 
      next();
    } catch (error) {
      next(error);
    }
});

adminSchema.plugin(mongoosePaginate);

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;