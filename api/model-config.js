module.exports = (req, res) => {
    let modelConfig = JSON.parse(JSON.stringify(req.crudModel.schema.obj));
    Object.keys(modelConfig).map((k) => {
        delete modelConfig[k].type;
        !modelConfig[k]?.config?.inputType && delete modelConfig[k];
    });
    return res.ok(modelConfig, `Successfully fetched model config for ${req.crudModel.modelName}`);
};
