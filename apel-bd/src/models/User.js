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

/*
create table usuario(
codigo_user int(10) primary key auto_increment, 
codigo int not null,
nome_user varchar(15),
nome_normal_user varchar(90),
idade int(2),
senha varchar(18),
sexo varchar(13),
area_atuacao varchar(50),
profissao varchar(50),
email varchar(50),
cod_cidade int(10),
Constraint FK_usuario_cidade_cidade_nome Foreign Key(cod_cidade)
References cidade (cod_cidade)
);
*/
