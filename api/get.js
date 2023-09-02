module.exports.getAll = async function (req, res) {
    try {
        let condition = { isActive: true };
        const data = await req.crudModel.find(condition).populate(getReferencedSchema(req)).lean();
        return res.ok(
            { data, total: data.length },
            `Successfully fetched all ${req.crudModel.collection.collectionName.slice(0, -1)}(s)`,
        );
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

module.exports.getById = async function (req, res) {
    try {
        let condition = { isActive: true };
        Object.assign(condition, { _id: req.params._id });
        const data = await req.crudModel.findOne(condition).populate(getReferencedSchema(req)).lean();
        if (!data) {
            return res.status(400).json({ success: false, message: "Data not found", total: 0, data: [] });
        }
        return res.ok(data, `Successfully fetched ${req.crudModel.collection.collectionName.slice(0, -1)}`);
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

function getReferencedSchema(req) {
    let referencedSchema = "";
    const model = req.crudModel;
    if (req?.query?.populate == "true" || req?.query?.populateKeys) {
        const populateKeys = req.query?.populateKeys?.split(",");
        referencedSchema = Object.keys(model.schema.obj)
            .map((e) =>
                Array.isArray(model.schema.obj[e])
                    ? model.schema.obj[e][0].hasOwnProperty("ref") && e
                    : model.schema.obj[e].hasOwnProperty("ref") && e,
            )
            .filter((e) => (populateKeys?.length ? populateKeys.includes(e) : e))
            .join(" ");
    }
    return referencedSchema;
}
