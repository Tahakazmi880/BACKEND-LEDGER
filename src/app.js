const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieparser = require("cookie-parser")


const app = express();

// middleware
app.use(express.json());
app.use(cookieparser());

// routes
app.use("/api/auth", authRoutes);


module.exports = app;