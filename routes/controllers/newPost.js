var models = require('./../models/schemas')

var getAll = require('./getAll')

// Will go into async parallel. Must only take callback as parameter
var newPostFunction = function(callback) {
    var newCategory     = new models.category({})
        ,newUser        = new models.user({})
        ,newPost        = new models.post({ category: newCategory, writtenBy: newUser })

    newPost.save(function(err, doc) {
        // console.log(models.idHash(doc._id))
        // models.idHash(doc._id)
        callback(null, doc);
    });
}

module.exports = {
    post: newPostFunction,
    categories: getAll.categories,
    users: getAll.users
}
