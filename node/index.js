const express = require('express')
const connectDB = require('./utils/connection.js')
const userRoute = require("./routes/userRoutes.js")
const productRoute = require('./routes/productRoutes.js')
const adminRoute = require('./routes/adminRoutes.js')
const path = require('path')
const app = express()

app.use(express.json())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
connectDB

app.get("/",(req,res)=>{
    res.send("hello word")
})

app.use("/api",userRoute)
app.use("/product",productRoute)
app.use("/admin",adminRoute)

app.listen(3000) 