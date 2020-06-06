const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Empresa = mongoose.model("Empresa");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const empresa = await Empresa.paginate({}, { page, limit: 10 });
    return res.json(empresa);
  },

  async show(req, res) {
    const empresa = await Empresa.findById(req.params.id);
    return res.json(empresa);
  },

  async signup(req, res) {
    const {
      _id,
      nome,
      endereco,
      email,
      telefone,
      senha,
      createdAt,
      __v,
    } = req.body;

    const hashedPass = await bcrypt.hash(senha, 10);

    const empr = {
      _id,
      nome,
      endereco,
      email,
      telefone,
      senha: hashedPass,
      createdAt,
      __v,
    };

    const empresa = await Empresa.create(empr);
    return res.json(empresa);
  },

  async login(req, res) {
    const empresa = await Empresa.find({ email: req.body.email });
    if (empresa.length === 0)
      return res.status(401).send({ mensagem: "Email ou senha incorretos " });

    await bcrypt.compare(req.body.senha, empresa[0].senha, (err, result) => {
      if (err) return res.status(401).send({ mensagem: "Erro na requisição" });
      if (result) {
        const token = jwt.sign(
          {
            _id: empresa[0]._id,
            email: empresa[0].email,
          },
          "305806b99b4de4300ad24fbb95ff55cb",
          {
            expiresIn: "5d",
          }
        );

        return res.status(200).send({
          tipo: "empresa",
          mensagem: "Autenticado com sucesso",
          token,
        });
      }
    });
  },

  async update(req, res) {
    const empresa = await Empresa.findByIdAndUpdate(req.usuario._id, req.body, {
      new: true,
    });
    return res.json(empresa);
  },

  async remove(req, res) {
    const nome = await Empresa.findById(req.params.id);
    await Empresa.findByIdAndRemove(req.params.id);

    return res.send("<h2>Empresa " + nome.nome + " removido com sucesso</h2>");
  },
};
