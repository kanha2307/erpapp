const UserModel = require('../models/userSchema.js')
const bcrypt = require('bcryptjs')

const getAllShopOwner = async (req,res)=>{
    try {
        const shopowners = await UserModel.find({role:'shopOwner'})
        res.status(200).json(shopowners)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getAllShopOwnerbyId = async (req,res)=>{
    const {id} = req.params
    try {
        const shopowners = await UserModel.findById(id)
        if(!shopowners){
            return res.status(401).json({message:'Shop Owner not found'})
        }
        res.status(200).json(shopowners)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const deleteShopOwner = async (req,res)=>{
    const {id} = req.params
    try {
        const shopowners = await UserModel.findByIdAndDelete(id)
        if(!shopowners){
            return res.status(401).json({message:'Shop Owner not found'})
        }
        res.status(200).json({message:'Owner deleted successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const updateShopOwner = async (req,res)=>{
    const {id} = req.params
    const {name,email,phone} = req.body
    try {
        const shopowners = await UserModel.findById(id)
        if(!shopowners || shopowners.role !== 'shopOwner'){
            return res.status(401).json({message:'Shop Owner not found'})
        }
        if(name) shopowners.name = name
        if(email) shopowners.email = email
        if(phone) shopowners.phone = phone

        await shopowners.save()
        res.status(200).json(shopowners)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const createShopOwner = async (req,res)=>{
    try {
        const {name,email,phone,password} = req.body
        const existingOwner = await UserModel.findOne({email,role:'shopOwner'})
        if(existingOwner){
            return res.status(401).json({message:'Shop Owner already exist'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const shopOwner = await UserModel.create({
            name,
            email,
            phone,
            password:hashedPassword,
            role:'shopOwner'
        })
        res.status(201).json(shopOwner)
        } catch (error) {
            res.status(500).json({error:error.message})
        }
}

const enableUser = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await UserModel.findOne({_id:id,role:'shopOwner'})
        if(!user){
            return res.status(400).json({message:'Owner not found'})
        }
        if(!user.hasPaid){
            return res.status(400).json({message:'Owner does not a subscription plan'})
        }
        user.isActive = true
        user.subscriptionStatus = true
        await user.save()
        
        res.status(200).json({message:'Owner enabled successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}
const disableUser = async (req,res)=>{
    try {
        const {id} = req.params
        const user = await UserModel.findOne({_id:id,role:'shopOwner'})
        if(!user){
            return res.status(400).json({message:'Owner not found'})
        }
        // if(!user.hasPaid){
        //     return res.status(400).json({message:'Owner does not a subscription plan'})
        // }
        user.isActive = false
        user.subscriptionStatus = false
        await user.save()
        
        res.status(200).json({message:'Owner disabled successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {getAllShopOwner,getAllShopOwnerbyId,deleteShopOwner,updateShopOwner,createShopOwner,enableUser,disableUser}