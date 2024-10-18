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
    type: Number,
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
  isActive: { 
    type: Boolean,
    default: true 
  }, // To enable/disable shop owners
  createdAt: { 
    type: Date, 
    default: Date.now 
 },
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
 createdAt: { 
    type: Date, 
    default: Date.now()
 },
});

module.exports = mongoose.model("User", userSchema);
