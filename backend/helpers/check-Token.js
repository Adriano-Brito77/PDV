const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

const checkToken = (req, res, next) => {
  console.log(req.headers);

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso Negado" });
  }

  const token = getToken(req);
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const verified = jwt.verify(token, "Nossosecret");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalido" });
  }
};
module.exports = checkToken;
