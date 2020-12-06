var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpeakerSchema = new Schema({
    name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    schedule: String
});

module.exports = mongoose.model('Speaker', SpeakerSchema);