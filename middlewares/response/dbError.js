const moment = require("moment");
module.exports = function (data = {}, message = "", status = 400) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message,
        data: data.stack,
        error: data.error,
    };
    res.status(status).json(resData);
};
