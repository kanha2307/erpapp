const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique:true
  },
  phone: {
    type: String,
    required: true,
    
    // unique:true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "shopOwner"],
    default: "user",
  },
  hasPaid: { 
    type: Boolean, 
    default: false 
  },
  isActive: { 
    type: Boolean,
    default: true 
  }, // To enable/disable shop owners
  
  avatar: { 
    type: String,
    default:'/uploads/default.png'
 }, // Optional avatar
  savedProducts: [
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product" 
    }
 ],
 subscriptionStatus: { type: Boolean, default: false },
 createdAt: { 
    type: Date, 
    default: Date.now()
 },
});

module.exports = mongoose.model("User", userSchema);
