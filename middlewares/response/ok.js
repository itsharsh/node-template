const moment = require("moment");
module.exports = function (data = [], message = "", status = 200) {
    const res = this;
    let resData = {
        timestamp: moment().unix(),
        success: true,
        message,
        total: (data && Array.isArray(data) && data?.length) || undefined,
        data: data || undefined,
    };
    if (data?.data) {
        Object.assign(resData, data);
    }
    return res.status(status).json(resData);
};
