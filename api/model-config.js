module.exports = (req, res, next) => {
    try {
        let modelConfig = { ...(req?.crudModel?.schema?.tree || req?.crudModel?.tree) };
        let data = [];
        Object.keys(modelConfig).forEach((k) => {
            delete modelConfig[k].type;
            delete modelConfig[k].index;
            delete modelConfig[k].enum;
            modelConfig[k].config && (modelConfig[k].config.key = k);
            data.push(modelConfig[k]);
            !modelConfig[k]?.config?.inputType && delete modelConfig[k] && data.pop();
        });
        req.responseJSON = {
            type: "ok",
            message: `Successfully fetched model config for ${req.crudModel.modelName}`,
            data,
        };
        return next();
    } catch (error) {
        return res.internalError(error);
    }
};
