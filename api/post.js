module.exports.create = async function (req, res, next) {
    try {
        let data = await new req.crudModel(req.body).save();
        if (!data) {
            return res.badRequest({}, `${req.crudModelName} : Record not created`);
        }
        req.responseJSON = {
            type: "ok",
            message: `Successfully Created ${req.crudModel.collection.collectionName.slice(0, -1)}`,
            data,
        };
        next();
    } catch (error) {
        return res.internalError(error);
    }
};
