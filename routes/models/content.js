var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/my');

// var db = mongoose.connection;
var ObjectId = Schema.ObjectId;

var Categories, Post, Image, User;

var ContentSchema = new Schema({

});

var UserSchema = new Schema({
    name: { type: String, required: true, default: 'No Name' }
});

var CategoriesSchema = new Schema({
    name: { type: String, required: true, unique: true, default: 'default' }
});

var PostSchmea = new Schema({
    title: { type: String, required: true, default: 'default title' },
    writtenBy: [UserSchema],
    publishedOn: { type: Date, default: Date.now },
    updatedOn: Date,
    published: { type: Boolean, required: true, default: false },
    content: { type: String, required: true, default: 'empty' },
    category: [CategoriesSchema],
    tags: [String],
    images: [String]
});

var ImagesSchema = new Schema({
    fileName: { type: String, required: true },
    publishedOn: { type: Date, required: true },
    post: [ObjectId],
    credit: String,
});

ImagesSchema.virtual('file_path').get(function(){
    // return http://media.mynews.com/id
});

Categories = mongoose.model('Categories', CategoriesSchema)
Post = mongoose.model('Posts', PostSchmea)
Image = mongoose.model('Images', ImagesSchema)
User = mongoose.model('Users', UserSchema)

module.exports = {
    category: Categories,
    post: Post,
    image: Image,
    user: User
}
