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

/*
create table empresa(
alvara int(10) primary key auto_increment,
nome_empresa varchar(30),
descricao varchar(100),
telefone varchar(20),
email varchar(30),
endereco varchar(60),
cod_cidade int(10),
Constraint FK_empresa_cidade_cod_cidade Foreign Key(cod_cidade)
References cidade (cod_cidade)
);
*/
