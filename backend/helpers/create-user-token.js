const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const { name, id } = user;

  const token = jwt.sign(
    {
      name,
      id,
    },
    "Nossosecret"
  );

  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    userid: id,
  });
};

module.exports = createUserToken;
