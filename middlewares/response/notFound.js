const moment = require("moment");
module.exports = function (data, message = "404: not found.", status = 404) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message,
        data: data || undefined,
    };
    return res.status(status).json(resData);
};
