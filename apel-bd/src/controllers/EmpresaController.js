const mongoose = require("mongoose");

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

  async store(req, res) {
    const empresa = await Empresa.create(req.body);
    return res.json(empresa);
  },

  async update(req, res) {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, {
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
