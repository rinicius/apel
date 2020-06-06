const express = require("express");
const routes = express.Router();
const Login = require("../middlewares/login");

const UserController = require("../controllers/UserController.js");
const EmpresaController = require("../controllers/EmpresaController.js");

routes.get("/usuario/:id", UserController.show); // Mostrar usuario
routes.get("/usuario", UserController.index); // Mostrar usuarios
routes.get("/empresa/:id", EmpresaController.show); // Mostrar empresa
routes.get("/empresa/", EmpresaController.index); // Mostrar empresas

routes.post("/usuario/cadastro", UserController.signup); // cadastrar usuario
routes.post("/empresa/cadastro", EmpresaController.signup); // cadastrar empresa

routes.post("/usuario/login", UserController.login); // login usuario
routes.post("/empresa/login", EmpresaController.login); // login empresa

routes.put("/usuario/editar", Login, UserController.update); // editar usuario
routes.put("/empresa/editar", Login, EmpresaController.update); // editar empresa

routes.delete("/usuario/:id", UserController.remove); // remover usuario
routes.delete("/empresa/:id", EmpresaController.update); // remover empresa

module.exports = routes;
