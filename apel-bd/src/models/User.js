const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const UserSchema = new mongoose.Schema({
  nome_sobrenome: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  idade: {
    type: String,
    required: false,
  },

  sexo: {
    type: String,
    required: false,
  },

  profissao: {
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
});

UserSchema.plugin(mongoosePaginate);
mongoose.model("Usuario", UserSchema);
