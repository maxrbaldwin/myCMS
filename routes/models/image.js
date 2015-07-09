var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Subdocuments
var PostSchema = require('./post')

var ImageSchema = new Schema({
    fileName: { type: String, required: true },
    publishedOn: { type: Date, required: true },
    post: [PostSchema],
    credit: String,
});

ImageSchema.virtual('file_path').get(function(){
    // return http://media.mynews.com/id
});

module.exports = ImageSchema
