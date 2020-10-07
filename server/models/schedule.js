var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleSchema = new Schema({
    schedule: { type: String, required: true },
    id_commercial: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);