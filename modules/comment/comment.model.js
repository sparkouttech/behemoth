
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * Comment Schema
 * @created_at Sat Dec 23 2023 12:41:12 GMT+0530 (India Standard Time)
 * @description Comment model
 */
const schema = new Schema({

    commented_user: {
        type: ObjectId,
        ref: 'users',
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        enum:[0, 1, 2],
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

schema.pre('save', () => {
    // This middleware is called while inserting records 2nd
    // console.log('Hello from pre save')
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
            const comment = await Comment.find(query, ignoreColoumns);
            resolve(comment);
        } catch (error) {
            reject(error)
        } 
    });
}

const Comment = mongoose.model('comments', schema);

module.exports = Comment;

