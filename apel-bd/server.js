const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
// const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(cors());

mongoose.connect("mongodb://localhost:27017/apel_DataBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requireDir("./src/models/");

const User = mongoose.model("Usuario");
const Empresa = mongoose.model("Empresa");

app.use("/api", require("./src/routes"));

app.listen(3001, () => {
  console.log("Servidor Iniciado");
});
