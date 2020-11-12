const mongoose = require("mongoose");
const axios = require("axios");
const { index } = require("./EmpresaController");

const Produto = mongoose.model("Produto");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const produto = await Produto.paginate({}, { page, limit: 4 });
    return res.json(produto);
  },

  async insert(req, res) {
    const {
      _id,
      nome,
      localizacao,
      descricao,
      tipo,
      createdAt,
      __v,
    } = req.body;
    let address = [];

    const locationiqtoken = "6d1132bd03e78f";

    await axios
      .get(
        `https://api.locationiq.com/v1/autocomplete.php?key=${locationiqtoken}&q=${localizacao}`
      )
      .then((res) => {
        address = [localizacao, [res.data[0].lat, res.data[0].lon]];
      })
      .catch((err) => {
        return res.status(200).send({ mensagem: "Endereço inválido" });
      });

    const produto = {
      _id,
      nome,
      localizacao: address,
      descricao,
      tipo,
      createdAt,
      __v,
    };

    const response = await Produto.create(produto);

    return res.json(response);
  },
};
