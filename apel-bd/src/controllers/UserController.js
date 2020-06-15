const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkType = require("../middlewares/typeUser");

const Usuario = mongoose.model("Usuario");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const usuario = await Usuario.paginate({}, { page, limit: 10 });
    return res.json(usuario);
  },

  async show(req, res) {
    const usuario = await Usuario.findById(req.params.id);
    return res.json(usuario);
  },

  async signup(req, res) {
    const {
      _id,
      nome_sobrenome,
      idade,
      sexo,
      profissao,
      email,
      senha,
      descricao,
      twitter,
      site,
      createdAt,
      __v,
    } = req.body;

    const hashedPass = await bcrypt.hash(senha, 10);

    const user = {
      _id,
      nome_sobrenome,
      idade,
      sexo,
      profissao,
      email,
      senha: hashedPass,
      descricao,
      twitter,
      site,
      createdAt,
      __v,
    };

    const usuario = await Usuario.create(user);
    return res.json(usuario);
  },

  async login(req, res, next) {
    const isUser = await checkType.checkType(req, res, next);
    if (!isUser) {
      next();
    } else {
      const usuario = await Usuario.find({ email: req.body.email });
      if (usuario.length === 0)
        return res.status(401).send({ mensagem: "email ou senha incorretos" });

      await bcrypt.compare(req.body.senha, usuario[0].senha, (err, result) => {
        if (err) {
          return res
            .status(401)
            .send({ mensagem: "email ou senha incorretos" });
        }
        if (result) {
          const token = jwt.sign(
            {
              _id: usuario[0]._id,
              email: usuario[0].email,
              tipo: "usuario",
            },
            "305806b99b4de4300ad24fbb95ff55cb",
            {
              expiresIn: "5d",
            }
          );

          const nome = usuario.nome_sobrenome;
          // window.localStorage.setItem(
          //   "CurrentUser",
          //   JSON.stringify({ token, nome })
          // );

          return res.status(200).send({
            tipo: "usuario",
            mensagem: "autenticado com sucesso",
            token,
          });
        }
        return res.status(401).send({ mensagem: "Falha na autorização" });
      });
    }
  },

  async update(req, res) {
    const {
      nome_sobrenome,
      idade,
      sexo,
      profissao,
      email,
      senha,
      descricao,
      twitter,
      site,
    } = req.body;

    const hashedPass = await bcrypt.hash(senha, 10);

    const user = {
      nome_sobrenome,
      idade,
      sexo,
      profissao,
      email,
      senha: hashedPass,
      descricao,
      twitter,
      site,
    };
    const usuario = await Usuario.findByIdAndUpdate(req.usuario._id, user, {
      new: true,
    });
    return res.json(usuario);
  },

  async remove(req, res) {
    const nome = await Usuario.findById(req.params.id);
    await Usuario.findByIdAndRemove(req.params.id);

    return res.status(200).send({
      mensagem: "Usuario " + nome.nome_sobrenome + " removido com sucesso",
    });
  },

  async upImage(req, res, next) {
    let user = await Usuario.findById(req.params.id);
    if (user == undefined) {
      next();
    } else {
      const filter = { _id: req.params.id };
      await Usuario.updateOne(filter, { img: req.file.path });

      return res.status(200).send({
        local: req.file.path,
      });
    }
    // let user = await Usuario.findOneAndUpdate(
    //   { _id: req.params.id },
    //   { img: req.file.path },
    //   {
    //     new: true,
    //   }
    // );
  },
};
