module.exports.update = async function (req, res) {
    try {
        let condition = { isActive: true, _id: req.params._id };
        let data = await req.crudModel.findOneAndUpdate(condition, { $set: req.body }, { new: true });

        if (data) {
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
