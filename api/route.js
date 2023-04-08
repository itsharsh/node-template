const express = require("express");
const apiRoute = express.Router();

const { before, after, sendResponse } = require("../middlewares/common");

const get = require("./get");
apiRoute.get("/", get.getAll);
apiRoute.get("/:_id", get.getById);

const post = require("./post");
apiRoute.post("/", before, post.create, after, sendResponse);

const put = require("./put");
apiRoute.put("/:_id", before, put.update, after, sendResponse);

const remove = require("./delete");
apiRoute.delete("/:_id", remove.softDelete);
apiRoute.delete("/hard/:_id", remove.hardDelete);

module.exports = apiRoute;
