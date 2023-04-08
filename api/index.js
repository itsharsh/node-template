const express = require("express");
const app = express();

const basicCrud = Object.keys(require("../../../models"));
basicCrud.map((e) => require(`../../../models`)[e]);

const initModel = (modelName) => (req, res, next) =>
    (req.crudModelName = modelName) && (req.crudModel = require(`../../../models`)[modelName]) && next();
basicCrud.map((model) => app.use(`/${model.toLowerCase()}`, initModel(model), require("./route")));

module.exports = app;
