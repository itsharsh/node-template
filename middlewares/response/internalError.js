const moment = require("moment");
module.exports = function (error, message, status = 500) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message || error?.message || "Oops, something went wrong.",
        stack: error?.stack,
    };
    return res.status(status).json(resData);
};
