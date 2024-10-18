const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    totalPrice:{
        type:Number,
        required:true,
        // unique:true
    },
    paymentStatus:{
        type:String,        
        enum:['pending','paid'],
        default:'pending'
    },
    orderStatus:{
        type:String,        
        enum:['pending','completed','cancelled'],
        default:'pending'
    },
    orderType:{
        type:String,
        enum:['online','inStore'],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Order",orderSchema)