require("dotenv").config();
const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
};

let notDefinedVariables = [];
Object.keys(env).map((e) => env[e] === undefined && notDefinedVariables.push(e));
if (notDefinedVariables.length) {
    const errorMessage = notDefinedVariables.join(",") + " is/are not configured in .env";
    console.error(errorMessage);
    process.exit(errorMessage);
}

module.exports = env;
