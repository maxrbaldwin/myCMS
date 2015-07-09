var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
    name: { type: String, required: true, unique: true, default: 'default' }
});

module.exports = CategoriesSchema
