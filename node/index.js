const express = require('express')
const connectDB = require('./utils/connection.js')
const userRoute = require("./routes/userRoutes.js")
const productRoute = require('./routes/productRoutes.js')
const adminRoute = require('./routes/adminRoutes.js')
const paymentRoute = require("./routes/paymentRoutes.js")
const path = require('path')
const app = express()
connectDB()
require("dotenv").config()

const cors = require('cors');
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the methods you want to allow
    credentials: true,
}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


app.get("/",(req,res)=>{
    res.send("hello word")
})

app.use("/api",userRoute)
app.use("/product",productRoute)
app.use("/admin",adminRoute)
app.use("/payment",paymentRoute)

app.listen(8000)