const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ProdutoSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  localizacao: {
    type: Array,
    required: true,
  },

  descricao: {
    type: String,
    required: true,
  },

  tipo: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ProdutoSchema.plugin(mongoosePaginate);
mongoose.model("Produto", ProdutoSchema);
