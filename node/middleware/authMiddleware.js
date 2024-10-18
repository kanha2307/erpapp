const jwt = require('jsonwebtoken')
const UserModel = require("../models/userSchema.js");

const authenticate = (req,res,next)=>{
    const token = req.header('Authorization')?.split(' ')[1]
    if(!token){
        return res.status(400).json({error:'Access Denied'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(400).json({error:'Invalid Token'})
    }
}

const isShopOWner = async (req,res,next)=>{
    try {
        const user = await UserModel.findById(req.user.id)
        if(user.role!=='shopOwner'){
            return res.status(403).json({message:'Access deniend.Shop owner privilege required'})
        }
        next()
    } catch (error) {
        return res.status(500).json({message:'Server error. please try again later'})
    }
}

const isAdmin = async(req,res,next)=>{
    try {
        const user = await UserModel.findById(req.user.id)
        if(user.role !== 'admin'){
            return res.status(403).json({message:'Access deniend. Admin privilege required'})
        }
        next()
    } catch (error) {
        return res.status(500).json({message:'Server error. please try again later'})
    }
}

module.exports = {authenticate,isShopOWner,isAdmin}