const router = require("express").Router();

const ItensController = require("../controllers/ItensController");

//middlewares
const checkToken = require("../helpers/check-Token");

//routes itens
router.post("/create", checkToken, ItensController.create);
router.get("/allitens", ItensController.getAllItens);
router.get("/gettitemid/:id", ItensController.gettItemId);
router.patch("/edititem/:id", checkToken, ItensController.editItem);
router.delete("/delete/:id", checkToken, ItensController.deleteItem);

module.exports = router;
