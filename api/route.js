const express = require("express");
const apiRoute = express.Router();

const { before, after, sendResponse } = require("../middlewares/common");

const modelConfig = require("./model-config");
apiRoute.get("/model-config", before, modelConfig, after, sendResponse);

const { getAll, getById, getFilter } = require("./get");
apiRoute.get("/:_id", getFilter, getById);
apiRoute.get("/", getFilter, getAll);

const { create } = require("./post");
apiRoute.post("/", before, create, after, sendResponse);

const { update } = require("./put");
apiRoute.put("/:_id", before, update, after, sendResponse);

const { softDelete, hardDelete } = require("./delete");
apiRoute.delete("/:_id", softDelete);
apiRoute.delete("/hard/:_id", hardDelete);

module.exports = apiRoute;
