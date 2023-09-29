let middlewares = require("../../../middlewares/");
async function before(req, res, next) {
    const position = "before";
    try {
        if (middlewares[req.crudModelName]?.[`${req.method}${req.route.path}`]?.[position]) {
            for (const eachMiddleware of middlewares[req.crudModelName][`${req.method}${req.route.path}`][position]) {
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
    return next();
}

async function after(req, res, next) {
    try {
        const position = "after";
        if (middlewares[req.crudModelName]?.[`${req.method}${req.route.path}`]?.[position]) {
            for (const eachMiddleware of middlewares[req.crudModelName][`${req.method}${req.route.path}`][position]) {
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
    return next();
}

function sendResponse(req, res) {
    try {
        const { type, message, data } = req.responseJSON;
        return res[type](data, message);
    } catch (error) {
        console.log(`🚀 ------------------------------------------------------🚀`);
        console.log(`🚀 ~ file: common.js:43 ~ sendResponse ~ error:`, error);
        console.log(`🚀 ------------------------------------------------------🚀`);
    }
}

module.exports = { after, before, sendResponse };
