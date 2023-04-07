module.exports = (req, res, next) => {
    res["Ok"] = require("./ok");
    res["html"] = require("./html");
    res["BadRequest"] = require("./badRequest");
    res["DBError"] = require("./dbError");
    res["InternalError"] = require("./internalError");
    res["UnAuthorized"] = require("./unAuthorized");
    res["Conflict"] = require("./conflict");
    res["NotFound"] = require("./notFound");
    res["dbErrorWithData"] = require("./dbErrorWithData");
    next();
};
