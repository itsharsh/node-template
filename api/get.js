exports.getFilter = async function (req, res, next) {
    const filters = { isActive: true };
    let query = req.query;
    query?.filters && Object.assign(filters, JSON.parse(query?.filters));
    req.filters = filters;
    req.query = query;
    next();
};

exports.getAll = async function (req, res) {
    try {
        const model = req.crudModel;
        const filters = req.filters;
        const populateData = getReferencedSchema(req.query, model);
        const data = await req.crudModel.find(filters).populate(populateData).lean();
        return res.ok(
            { data, total: data.length },
            `Successfully fetched all ${req.crudModel.collection.collectionName.slice(0, -1)}(s)`,
        );
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

exports.getById = async function (req, res) {
    try {
        const filters = req.filters;
        const data = await req.crudModel.findOne(filters).populate(getReferencedSchema(req)).lean();
        if (!data) {
            return res.status(400).json({ success: false, message: "Data not found", total: 0, data: [] });
        }
        return res.ok(data, `Successfully fetched ${req.crudModel.collection.collectionName.slice(0, -1)}`);
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

function getReferencedSchema(query, model) {
    const referencedSchema = [];
    if (query?.populate == "true" || query?.populateKeys) {
        const shouldPopulate = query?.populate == "true";
        const populateKeys = query?.populateKeys?.split(",");
        const populateSelect = query?.populateSelect ? JSON.parse(query?.populateSelect) : {};
        Object.keys(model.schema.obj).forEach((e) => {
            const referencedKey = Array.isArray(model.schema.obj[e])
                ? model.schema.obj[e][0].hasOwnProperty("ref") && model.schema.obj[e][0]
                : model.schema.obj[e].hasOwnProperty("ref") && model.schema.obj[e];
            referencedKey &&
                (populateKeys ? populateKeys.includes(e) : shouldPopulate) &&
                referencedSchema.push({
                    path: e,
                    model: referencedKey.ref,
                    select: populateSelect[e] || "",
                });
        });
    }
    return referencedSchema;
}
