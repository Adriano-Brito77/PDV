const router = require("express").Router();

const ItensController = require("../controllers/ItensController");

//middlewares
const checkToken = require("../helpers/check-Token");

//routes itens
router.post("/create", checkToken, ItensController.create);

module.exports = router;
