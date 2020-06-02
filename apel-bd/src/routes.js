const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
const EmpresaController = require("./controllers/EmpresaController");

/*faltando fazerrrrrrrrrrrrrr*/
routes.post("/usuario/login", UserController.login);
routes.post("/empresa/login", EmpresaController.login);
/*faltando fazerrrrrrrrrrrrr*/

routes.get("/usuario/:id", UserController.show); // Mostrar usuario
routes.get("/usuario", UserController.index); // Mostrar usuarios
routes.get("/empresa/:id", EmpresaController.show); // Mostrar empresa
routes.get("/empresa/", EmpresaController.index); // Mostrar empresas

routes.post("/usuario", UserController.store); // cadastrar usuario
routes.post("/empresa", EmpresaController.store); // cadastrar empresa

routes.put("/usuario/:id", UserController.update); // editar usuario
routes.put("/empresa/:id"); // editar empresa

routes.delete("/usuario/:id", UserController.remove); // remover usuario
routes.delete("/empresa/:id"); // remover empresa

module.exports = routes;
