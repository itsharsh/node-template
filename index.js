const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

module.exports = async (app) => {
    app.use(cors());
    app.use(logger("dev"));
    app.use(bodyParser.json({ limit: "50mb" }));

    app.use(require("./middlewares"));

    app.get("/", (req, res) => res.Ok(null, "node-template"));
};
