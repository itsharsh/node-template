const express = require("express");
const apiRoute = express.Router();

const { before, after, sendResponse } = require("../middlewares/common");

const { getAll, getById } = require("./get");
apiRoute.get("/model-config", (req, res) => {
    let modelConfig = req.crudModel.schema.obj;
    Object.keys(modelConfig).map(k=>{
        delete modelConfig[k].type;
    })
    return res.ok(modelConfig)
});
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
