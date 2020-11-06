const express = require("express");
const routes = express.Router();
const Login = require("../middlewares/login");
const checkType = require("../middlewares/typeUser");
const multer = require("multer");

const UserController = require("../controllers/UserController.js");
const EmpresaController = require("../controllers/EmpresaController.js");
const ProdutoController = require("../controllers/ProdutoController.js");

routes.get("/", (req, res) => {
  res.json({
    Hello: "hi!",
  });
});

routes.get("/show/:id", UserController.show, EmpresaController.show); // Mostrar usuario
routes.get("/usuario", UserController.index); // Mostrar usuarios

routes.get("/produto", ProdutoController.index); // Mostrar produtos

routes.get("/empresa/", EmpresaController.index); // Mostrar empresa
routes.get("/empresas/", EmpresaController.indexAll); // Mostrar empresas

routes.post("/decode", Login);

routes.post("/produto/cadastro", ProdutoController.insert); // cadastrar produto
routes.post("/usuario/cadastro", UserController.signup); // cadastrar usuario
routes.post("/empresa/cadastro", EmpresaController.signup); // cadastrar empresa

routes.post("/achartipo", checkType.checkType);

routes.post("/login", UserController.login, EmpresaController.login); // Login

routes.post("/usuario/login", UserController.login); // login usuario
routes.post("/empresa/login", EmpresaController.login); // login empresa

routes.put("/usuario/editar", UserController.update); // editar usuario
routes.put("/empresa/editar", EmpresaController.update); // editar empresa

routes.delete("/usuario/:id", UserController.remove); // remover usuario
routes.delete("/empresa/:id", EmpresaController.update); // remover empresa

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../assets/img");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, Date.now() + "." + extension); //Appending .jpg
  },
});

var upload = multer({ storage: storage });

routes.post(
  "/profile/:id",
  upload.single("avatar"),
  function (req, res, next) {
    next();
  },
  UserController.upImage,
  EmpresaController.upImage
);

module.exports = routes;
