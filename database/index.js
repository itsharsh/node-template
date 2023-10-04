const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/env");

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        let dbName = "";
        try {
            dbName = MONGO_URI.toString().split("/");
            dbName = dbName[dbName.length - 1].split("?")[0];
        } catch (error) {}
        console.log("Database connected - ", dbName);
        mongoose.set("overwriteModels", true);
    } catch (error) {
        console.log(` ----------------------------------------------`);
        console.log(`file: dbConnection.js ~ line 19 ~ error`, error.message);
        console.log(` ----------------------------------------------`);
        setTimeout(() => connectDB(), 1000);
    }
}
connectDB();
