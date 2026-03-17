const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authmiddleware(req, res, next) {
    try {

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided",
                status: "failed"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                status: "failed"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            status: "failed"
        });
    }
}

module.exports = authmiddleware;