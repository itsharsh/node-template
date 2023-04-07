const express = require("express");
const app = express.Router();

app.use(require("./response"));

module.exports = app;
