const router = require("express").Router();

//controllers
const UserController = require("../controllers/UserController");

//middlewares
const checkToken = require("../helpers/check-Token");

//routes User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch("/edit/:id", checkToken, UserController.editUser);

module.exports = router;
