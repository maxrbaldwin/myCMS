var shortid = require('shortid')

var models      = require('./../models/schemas')

var newCategoryFunction = function(callback) {
    var newCategory = new models.category({name: 'default_' + shortid.generate()});

    newCategory.save(function(err, doc){
        if (err) {
            console.log(err)
        } else {
            callback(null, doc)
        }
    });
}

module.exports = {
    category: newCategoryFunction
}
