var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Subdocuments
var UserSchema = require('./user')
    ,CategorySchema = require('./category')

var PostSchmea = new Schema({
    title: { type: String, required: true, default: 'default title' },
    writtenBy: [UserSchema],
    publishedOn: { type: Date, default: Date.now },
    updatedOn: Date,
    published: { type: Boolean, required: true, default: false },
    content: { type: String, required: true, default: 'empty' },
    category: [CategorySchema],
    tags: [String],
    images: [String]
});

module.exports = PostSchmea
