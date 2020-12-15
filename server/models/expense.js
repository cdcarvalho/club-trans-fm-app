var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    description: { type: String, required: true },
    phone: { type: String },
    month: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Expense', ExpenseSchema);