const accountModel = require("../models/account.model.js");

// Create Account
async function createAccountController(req, res) {
    try {

        const userId = req.user._id; // auth middleware se aa raha hai
        const { currency } = req.body;

        const account = await accountModel.create({
            user: userId,
            currency
        });

        return res.status(201).json({
            message: "Account created successfully",
            status: "success",
            account
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "failed"
        });
    }
}


// Get all accounts of logged-in user
async function getUserAccountsController(req, res) {
    try {

        const userId = req.user._id;

        const accounts = await accountModel.find({ user: userId });

        return res.status(200).json({
            message: "Accounts fetched successfully",
            status: "success",
            accounts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "failed"
        });
    }
}

module.exports = {
    createAccountController,
    getUserAccountsController
};