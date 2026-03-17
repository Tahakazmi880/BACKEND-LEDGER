const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  createAccountController,
  getUserAccountsController
} = require("../controllers/account.controller");

// create account
router.post("/create-account", authMiddleware, createAccountController);

// get logged-in user accounts
router.get("/", authMiddleware, getUserAccountsController);

module.exports = router;