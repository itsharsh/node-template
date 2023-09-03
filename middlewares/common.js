let middlewares = require("../../../middlewares/");
async function before(req, res, next) {
    const position = "before";
    try {
        if (middlewares[req.crudModelName]?.[req.method]?.[position]) {
            for (const eachMiddleware of middlewares[req.crudModelName][req.method][position]) {
                try {
                    await eachMiddleware(req, res, next);
                } catch (error) {
                    return res.badRequest(error);
                }
            }
        }
    } catch (error) {
        return res.internalError(error);
    }
    next();
}

async function after(req, res, next) {
    try {
        const position = "after";
        if (middlewares[req.crudModelName]?.[req.method]?.[position]) {
            for (const eachMiddleware of middlewares[req.crudModelName][req.method][position]) {
                try {
                    await eachMiddleware(req, res, next);
                } catch (error) {
                    return res.badRequest(error);
                }
            }
        }
    } catch (error) {
        return res.internalError(error);
    }
    next();
}

function sendResponse(req, res) {
    const { type, message, data } = req.responseJSON;
    return res[type](data, message);
}

module.exports = { after, before, sendResponse };
