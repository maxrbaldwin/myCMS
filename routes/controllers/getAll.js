// Helper functions to get all categories and users in an async parallel function

var models = require('./../models/schemas')

var categories = function(callback) {
    models.category.find({}, function(err, Categories){
        callback(null, Categories)
    });
}

var users = function(callback) {
    models.user.find({}, function(err, Users){
        callback(null, Users)
    });
}

var posts = function(callback) {
    models.post
    .find()
    .limit(20)
    .exec(function(err, docs){
        if(err) {
            console.log(err)
        } else {
            callback(null, docs)
        }
    });
}

module.exports = {
    categories: categories,
    users: users,
    posts: posts
}
