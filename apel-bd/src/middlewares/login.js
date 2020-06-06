const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "305806b99b4de4300ad24fbb95ff55cb");
    req.usuario = decode;
    next();
  } catch (e) {
    return res.status(401).send({ mensagem: "falha na autorização" });
  }
};
