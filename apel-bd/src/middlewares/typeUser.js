const mongoose = require("mongoose");

const Empresa = mongoose.model("Empresa");
const Usuario = mongoose.model("Usuario");

module.exports = {
  async checkType(req, res, next) {
    const user = await Usuario.find({ email: req.body.email });
    const empresa = await Empresa.find({ email: req.body.email });
    if (!user.length == 0) {
      //   return res.status(200).send({
      //     tipo: "usuario",
      //   });
      return true;
    } else if (!empresa.length == 0) {
      //   return res.status(200).send({
      //     tipo: "empresa",
      //   });
      return false;
    } else {
      return null;
    }
  },
};
