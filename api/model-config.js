module.exports = (req, res) => {
    let modelConfig = { ...(req?.crudModel?.schema?.tree || req?.crudModel?.tree) };
    let dataToSend = [];
    Object.keys(modelConfig).forEach((k) => {
        delete modelConfig[k].type;
        modelConfig[k].config && (modelConfig[k].config.key = k);
        dataToSend.push(modelConfig[k]);
        !modelConfig[k]?.config?.inputType && delete modelConfig[k] && dataToSend.pop();
    });
    return res.ok(dataToSend, `Successfully fetched model config for ${req.crudModel.modelName}`);
};
