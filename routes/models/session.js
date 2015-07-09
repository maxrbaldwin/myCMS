var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
    sessionId: {type: String, required: true},
    deviceId: {type: String, required: true},
    type: {type: String, required: true},
    expries: {type: Number, required: true},
    active: {type: Boolean, required: true},
    cookie: {type: String, required: true}
});

module.exports = SessionSchema;
