module.exports.create = async function (req, res, next) {
    try {
        let data = await new req.crudModel(req.body).save();
        if (!data) {
            return res.badRequest({}, `${req.crudModelName} : Record not created`);
        }
        req.responseStatusCode = 201;
        req.responseJson = {
            success: true,
            message: `Successfully Created ${req.crudModel.collection.collectionName.slice(0, -1)}`,
            data,
        };
        req.updateStatus = req.hasOwnProperty("updateStatus") ? req.updateStatus : {};
        req.updateStatus[req.crudModelName.toLowerCase()] = data;
        next();
    } catch (error) {
        return res.internalError(error);
    }
};
