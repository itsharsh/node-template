const moment = require("moment");

module.exports = function (data = {}, message = "", status = 400) {
    let res = this;
    let resData = {
        timestamp: moment().unix(),
        success: false,
        message: message,
    };
    let result = Object.assign({}, resData, data);
    res.status(status).json(result);
};
