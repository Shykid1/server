const mongoose = require("mongoose");
const env = require("dotenv");

// config env
env.config();

// connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
