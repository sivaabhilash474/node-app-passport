const express = require("express");
const app = express();

const path = require("path");
app.set('views', path.join(__dirname, 'views'));
app.use("/contact-us.html", express.static("html"));

module.exports = app;