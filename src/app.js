const express = require("express");
const cookieparser = require("cookie-parser")


const app = express();

// middleware
app.use(express.json());
app.use(cookieparser());


// routes
const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes.js")

// use routes
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);


module.exports = app;