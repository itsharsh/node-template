module.exports.softDelete = async function (req, res) {
    try {
        let condition = { isActive: true };
        Object.assign(condition, { _id: req.params._id });
        let data = await req.crudModel.findOneAndUpdate(condition, { $set: { isActive: false } }, { new: true });
        if (!data) {
            let message = `Record not found: ${req.crudModelName} ${req.params._id}`;
            return res.badRequest({}, message);
        }
        return res.ok(data, `Successfully Deleted ${req.crudModel.collection.collectionName.slice(0, -1)}`);
    } catch (error) {
        return res.internalError(error);
    }
};

module.exports.hardDelete = async function (req, res) {
    try {
        let data = await req.crudModel.findOneAndDelete({ _id: req.params._id });
        if (!data) {
            return res.badRequest({}, `Record not found: ${req.crudModelName} ${req.params._id}`);
        }
        return res.ok(data, `Successfully Deleted ${req.crudModel.collection.collectionName.slice(0, -1)}`);
    } catch (error) {
        return res.internalError(error);
    }
};
