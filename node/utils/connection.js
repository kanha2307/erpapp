const mongoose = require('mongoose')
require("dotenv").config()


const url = process.env.URL
const connectDB = async () => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB!');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  };
  
module.exports = connectDB

