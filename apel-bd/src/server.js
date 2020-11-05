const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONBODB_URI || "mongodb://localhost/apel_DataBase",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

requireDir("./models/");

const User = mongoose.model("Usuario");
const Empresa = mongoose.model("Empresa");

app.use("/api", require("./routes/routes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor Iniciado!");
});

module.exports = app;
