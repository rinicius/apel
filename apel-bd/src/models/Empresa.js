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
    default:
      "https://firebasestorage.googleapis.com/v0/b/apel-a997a.appspot.com/o/images%2Fdefault-placeholder-1-2.png?alt=media&token=b4485c58-5ed2-43b7-99db-3c03b3c8fa35",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

EmpresaSchema.plugin(mongoosePaginate);
mongoose.model("Empresa", EmpresaSchema);
