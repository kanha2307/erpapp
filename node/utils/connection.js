const mongoose = require('mongoose')
require("dotenv").config()

const url = process.env.URL

const connectDB = mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = connectDB

