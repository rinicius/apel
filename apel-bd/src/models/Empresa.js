const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const EmpresaSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  endereco: {
    type: Array,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  senha: {
    type: String,
    required: true,
  },

  telefone: {
    type: String,
    required: true,
  },

  descricao: {
    type: String,
    required: false,
  },

  twitter: {
    type: String,
    required: false,
  },

  site: {
    type: String,
    required: false,
  },

  img: {
    type: String,
    required: false,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

EmpresaSchema.plugin(mongoosePaginate);
mongoose.model("Empresa", EmpresaSchema);
