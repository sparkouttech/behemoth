
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const env = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * User Schema
 * @created_at Sat Dec 23 2023 12:36:33 GMT+0530 (India Standard Time)
 * @description User model
 */
const schema = new Schema({

    name: {
        type: String,
        required: [true, 'name must not be empty'],
    },
    employee_id: {
        type: String,
        required: [true, 'employee id must not be empty'],
    },
    role_id: {
        type: ObjectId, 
        ref: 'roles',
        required: true,
    },
    team_id: {
        type: ObjectId, 
        ref: 'teams',
        required: true,
    },
    is_lead: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profile_picture: {
        type: String,
        // You might want to add validations for URL format or use a different type if needed
    },
    password: {
        type: String,
        required: true,
        // You might want to add password hashing for security
    },
    profile: [{
        key: { type: String },
        value: { type: String }
    }],
    authentication_token: { 
        type: String, 
        unique: true 
    },
    status: {
        type: Number,
        enum:[0, 1],
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
}, { timestamps: false, versionKey: false });

schema.plugin(mongoosePaginate);

schema.post('init', function(doc) {
    // it is called while accessing the data from DB example: find()
    // console.log('%s has been initialized from the db', doc._id);
});

schema.post('validate', function(doc) {
    // This middleware is called while inserting records 1st
    // console.log('%s has been validated (but not saved yet)', doc._id);
});

schema.pre('save', async function (next) {
    try {
      const obj = { ...this }
      this.authentication_token = jwt.sign({email: obj._doc.email, _id: obj._doc._id}, env.JWT_SECRET);
      this.password = await bcrypt.hash(this.password, Number(env.BCRYPT_SALT_ROUND)); 
      next();
    } catch (error) {
      next(error);
    }
});

schema.post('save', function(doc) {
    // This middleware is called while inserting records 3rd
    // console.log('%s has been saved', doc._id);
});

schema.post('remove', function(doc) {
    // console.log('%s has been removed', doc._id);
});

schema.pre('findOneAndUpdate', function (next) {
    this.set({ updated_at: new Date() });
    next();
});

schema.pre('updateOne', function (next) {
    this.set({ updated_at: new Date() });
    next();
});

schema.pre('updateMany', function (next) {
    this.set({ updated_at: new Date() });
    next();
});

schema.methods._list = function(query = {}, ignoreColoumns = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.find(query, ignoreColoumns);
            resolve(user);
        } catch (error) {
            reject(error)
        } 
    });
}

schema.index({ email: 1 });

const User = mongoose.model('users', schema);

module.exports = User;

