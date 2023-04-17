module.exports = (req, res) => {
    let modelConfig = JSON.parse(JSON.stringify(req.crudModel.schema.obj));
    let dataToSend = [];
    Object.keys(modelConfig).map((k) => {
        delete modelConfig[k].type;
        dataToSend.push({ key: k, ...modelConfig[k] });
        !modelConfig[k]?.config?.inputType && delete modelConfig[k] && dataToSend.pop();
    });
    return res.ok(dataToSend, `Successfully fetched model config for ${req.crudModel.modelName}`);
};
