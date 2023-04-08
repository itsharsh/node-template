const moment = require("moment");
module.exports = function (error = {}, message = "", status = 400) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message,
        stack: error?.stack,
        error: error?.message,
    };
    res.status(status).json(resData);
};
