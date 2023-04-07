const moment = require("moment");
module.exports = function (data = null, message = "Route not found.", status = 404) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message,
        data: data,
    };
    return res.status(status).json(resData);
};
