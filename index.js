const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");

module.exports = async (app) => {
    require("./database");

    app.use(cors());
    app.use(logger("dev"));
    app.use(bodyParser.json({ limit: "50mb" }));

    app.use(require("./middlewares"));

    app.get("/", (req, res) => res.ok(null, "App Working"));
    app.get(`/health-check`, (req, res) => res.ok(null, `[HealthCheck]: App working`));


    app.use(require("./api"));

    app.get("/", (req, res) => res.Ok(null, "node-template"));
};
