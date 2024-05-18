const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cargo: { type: String, required: true },
  departamento: { type: String, required: true },
  dataAdmissao: { type: Date, required: true },
});

module.exports = mongoose.model('Employee', employeeSchema, 'main'); // Terceiro argumento especifica o nome da coleção

