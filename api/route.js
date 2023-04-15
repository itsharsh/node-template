const express = require("express");
const apiRoute = express.Router();

const { before, after, sendResponse } = require("../middlewares/common");

const modelConfig = require("./model-config");
apiRoute.get("/model-config", modelConfig);

const { getAll, getById } = require("./get");
apiRoute.get("/:_id", getById);
apiRoute.get("/", getAll);

const { create } = require("./post");
apiRoute.post("/", before, create, after, sendResponse);

const { update } = require("./put");
apiRoute.put("/:_id", before, update, after, sendResponse);

const { softDelete, hardDelete } = require("./delete");
apiRoute.delete("/:_id", softDelete);
apiRoute.delete("/hard/:_id", hardDelete);

module.exports = apiRoute;
