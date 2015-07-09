var models = require('./../models/schemas')
    ,ObjectId   = require('mongoose').Types.ObjectId

var getAll = require('./getAll')

var updatePost = function(callback) {
    models.post.findOne({
        _id: ObjectId(module.exports.id)
    }, function(err, doc) {
        if (err) {
            console.log(err)
        } else {
            callback(null, doc)
        }
    });
}

module.exports = {
    exec: {
        post: updatePost,
        categories: getAll.categories,
        users: getAll.users
    }
}
