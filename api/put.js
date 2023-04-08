module.exports.update = async function (req, res, next) {
    try {
        let condition = { isActive: true, _id: req.params._id };

        let dataToUpdate = req.body;

        let data = await req.crudModel.findOneAndUpdate(condition, { $set: dataToUpdate }, { new: true });
        if (!data) {
            return res.badRequest({}, `Record not found: ${req.params._id}`);
        }

        req.responseJSON = {
            type: "ok",
            message: `Successfully Updated ${req.crudModel.collection.collectionName.slice(0, -1)}`,
            data,
        };
        next();
    } catch (error) {
        return res.internalError(error);
    }
};
