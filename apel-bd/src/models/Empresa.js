const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const EmpresaSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  endereco: {
    type: String,
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

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

EmpresaSchema.plugin(mongoosePaginate);
mongoose.model("Empresa", EmpresaSchema);
