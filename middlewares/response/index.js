module.exports = (req, res, next) => {
    res.ok = require("./ok");
    res.dBError = require("./dbError");
    res.badRequest = require("./badRequest");
    res.internalError = require("./internalError");
    res.unAuthorized = require("./unAuthorized");
    res.notFound = require("./notFound");
    next();
};
