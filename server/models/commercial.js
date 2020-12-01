var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var commercialSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    cnpj_cpf: { type: String, required: true },
    phone: String,
    mobile_number: String,
    email: String,
    price: { type: String, required: true },
    due_date: { type: Number, required: true },
    total_calls: { type: Number, required: true },
    speaker: { type: String, required: true },
    percentage: { type: Number, required: true }
});

module.exports = mongoose.model('Commercial', commercialSchema);