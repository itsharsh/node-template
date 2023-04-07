const moment = require("moment");
module.exports = function (error = {}, message = "Unauthorized", status = 401) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message || error.message,
        stack: error.stack,
    };
    return res.status(status).json(resData);
};
