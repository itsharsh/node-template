let middlewares = {};
async function before(req, res, next) {
    let position = "before";
    try {
        if (
            middlewares[req.crudModelName] &&
            middlewares[req.crudModelName][req.method] &&
            middlewares[req.crudModelName][req.method][position]
        ) {
            for (let eachMiddleware of middlewares[req.crudModelName][req.method][position]) {
                await eachMiddleware(req, res);
            }
        }
    } catch (error) {
        return res.internalError()
    }
    next();
}

async function after(req, res, next) {
    try {
        let position = "after";
        if (
            middlewares[req.crudModelName] &&
            middlewares[req.crudModelName][req.method] &&
            middlewares[req.crudModelName][req.method][position]
        ) {
            for (let eachMiddleware of middlewares[req.crudModelName][req.method][position]) {
                await eachMiddleware(req, res);
            }
        }
    } catch (error) {
        return res.internalError()
    }
    next();
}

function sendResponse(req, res) {
    return res.status(req.responseStatusCode).json(req.responseJson);
}

module.exports = { after, before, sendResponse };
