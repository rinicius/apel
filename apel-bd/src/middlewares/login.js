const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  try {
    const decode = jwt.verify(
      req.body.token,
      "305806b99b4de4300ad24fbb95ff55cb"
    );
    req.usuario = decode;
    return res.status(200).send({ decode });
  } catch (e) {
    console.log(e);
    return res.status(401).send({ mensagem: "falha na autorização" });
  }
};
