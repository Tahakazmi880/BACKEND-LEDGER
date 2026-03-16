const express = require("express");

const router = express.Router();
const authcontroller = require("../controllers/auth.controller.js");


// register route
router.post("/register", authcontroller.registerUserController);

// login route
router.post("/login", authcontroller.userLoginController)


module.exports = router;