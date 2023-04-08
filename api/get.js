module.exports.getAll = async function (req, res) {
    try {
        let modelConfig = req.crudModel.schema.obj;
        let condition = { isActive: true };
        let data = await req.crudModel.find(condition).populate(getReferencedSchema(req));
        return res.ok(
            { data, total: data.length, modelConfig },
            `Successfully fetched all ${req.crudModel.collection.collectionName.slice(0, -1)}(s)`
        );
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

module.exports.getById = async function (req, res) {
    try {
        let condition = { isActive: true };
        Object.assign(condition, { _id: req.params._id });
        let data = await req.crudModel.findOne(condition).populate(getReferencedSchema(req));
        if (!data) {
            return res.status(400).json({ success: false, message: "Data not found", total: 0, data: [] });
        }
        return res.ok(data, `Successfully fetched ${req.crudModel.collection.collectionName.slice(0, -1)}`);
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

function getReferencedSchema(req) {
    let model = req.crudModel;
    let referencedSchema = "";
    if (req.query.populate == "true") {
        referencedSchema = Object.keys(model.schema.obj)
            .map((e) =>
                Array.isArray(model.schema.obj[e])
                    ? model.schema.obj[e][0].hasOwnProperty("ref") && e
                    : model.schema.obj[e].hasOwnProperty("ref") && e
            )
            .filter((e) => e)
            .join(" ");
    }
    return referencedSchema;
}
