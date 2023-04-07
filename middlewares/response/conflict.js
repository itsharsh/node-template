const moment = require("moment");
module.exports = function (data = null, message = "", status = 409) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message,
        data: data,
    };
    res.status(status).json(resData);
};
