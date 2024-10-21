const mongoose = require('mongoose')
require("dotenv").config()


const url = `mongodb+srv://kanha:KINGSMAN@cluster0.zhe01ct.mongodb.net/kkkk?retryWrites=true&w=majority&appName=Cluster0`
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

