const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
    },
    image: {
        type: String, 
        required: true,
      },
    price:{
        type:Number,
        required:true,
        // unique:true
    },
    category:{
        type:String,        
    },
    stock: { 
        type: Number, 
        default: 0 
    }, 
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true        
    },
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:'Point',
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    createdAt: { 
        type: Date, 
        default: Date.now()
    },
})

productSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Product",productSchema)