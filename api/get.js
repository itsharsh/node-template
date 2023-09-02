exports.getAll = async function (req, res) {
    try {
        const model = req.crudModel;
        const filters = getFilters(req.body);
        const populateData = getReferencedSchema(req.body, model);
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
        const filters = { isActive: true };
        Object.assign(filters, { _id: req.params._id });
        const data = await req.crudModel.findOne(filters).populate(getReferencedSchema(req)).lean();
        if (!data) {
            return res.status(400).json({ success: false, message: "Data not found", total: 0, data: [] });
        }
        return res.ok(data, `Successfully fetched ${req.crudModel.collection.collectionName.slice(0, -1)}`);
    } catch (error) {
        return res.internalError(error, `${req.crudModelName} :  ${error.message}`);
    }
};

function getFilters(body) {
    const filters = { isActive: true };
    body?.filters && Object.assign(filters, body.filters);
    return filters;
}

function getReferencedSchema(body, model) {
    const referencedSchema = [];
    if (body?.populate == "true" || body?.populateKeys) {
        Object.keys(model.schema.obj).forEach((e) => {
            const referencedKey = Array.isArray(model.schema.obj[e])
                ? model.schema.obj[e][0].hasOwnProperty("ref") && model.schema.obj[e][0]
                : model.schema.obj[e].hasOwnProperty("ref") && model.schema.obj[e];
            referencedKey &&
                referencedSchema.push({
                    path: e,
                    model: referencedKey.ref,
                    select: body?.populateSelect[e] || "",
                });
        });
    }
    return referencedSchema;
}
