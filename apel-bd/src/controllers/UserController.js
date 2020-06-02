const mongoose = require("mongoose");

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

  async store(req, res) {
    const usuario = await Usuario.create(req.body);
    return res.json(usuario);
  },

  async update(req, res) {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(usuario);
  },

  async remove(req, res) {
    const nome = await Usuario.findById(req.params.id);
    await Usuario.findByIdAndRemove(req.params.id);

    return res.send(
      "<h2>Usuario " + nome.nome_sobrenome + " removido com sucesso</h2>"
    );
  },
};
