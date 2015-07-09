/* Change this file to index.js so that you only have to reference the directory and not the file */

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my');

var UserSchema      = require('./user')
var ImageSchema     = require('./image')
var PostSchema      = require('./post')
var CategorySchema  = require('./category')
var SessionSchema   = require('./session')

var Categories, Post, Image, User, Session;

var tools = {}

var isObjectId = function(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

tools.idHash = function(mongoId, callback) {
    return mongoId.charCount(mongoId)
}

Categories = mongoose.model('Categories', CategorySchema)
Post = mongoose.model('Posts', PostSchema)
Image = mongoose.model('Images', ImageSchema)
User = mongoose.model('Users', UserSchema)
Session = mongoose.model('Sessions', SessionSchema)

module.exports = {
    category: Categories,
    post: Post,
    image: Image,
    user: User,
    tools: tools
}
