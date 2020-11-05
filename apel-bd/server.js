const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://viniciususer:dede102010@cluster0.xccg8.mongodb.net/apel?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

requireDir("./src/models/");

const User = mongoose.model("Usuario");
const Empresa = mongoose.model("Empresa");

app.use("/api", require("./src/routes/routes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Servidor Iniciado!");
});

module.exports = app;
