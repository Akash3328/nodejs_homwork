const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Meet-Dev:C7SJdEcDU0SWaGgx@meet-dev.ll2bgjx.mongodb.net/Meet-dev");
};

module.exports =  connectDB;
