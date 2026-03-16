const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const emailService = require("../services/email.service.js");

async function registerUserController(req, res) {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({
                message: "Email, name and password are required",
                status: "failed"
            });
        }

        const isExist = await userModel.findOne({ email });

        if (isExist) {
            return res.status(422).json({
                message: "User already exists with this email address",
                status: "failed"
            });
        }

        const usercreate = await userModel.create({
            email,
            password,
            name
        });

        const token = jwt.sign(
            { userId: usercreate._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });

        // registration email send
        await emailService.sendRegistrationEmail(usercreate.email, usercreate.name);

        return res.status(201).json({
            message: "User registered successfully",
            status: "success",
            user: {
                _id: usercreate._id,
                email: usercreate.email,
                name: usercreate.name
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "failed"
        });
    }
}

/**
 * - user login controller
 * - post /api/auth/login
 */
async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                status: "failed"
            });
        }

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                message: "User not found with this email address",
                status: "failed"
            });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "failed"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(200).json({
            message: "User logged in successfully",
            status: "success",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: "failed"
        });
    }
}

module.exports = {
    registerUserController,
    userLoginController
};