const express = require('express')
const { isAdmin, authenticate } = require('../middleware/authMiddleware')
const { getAllShopOwner, getAllShopOwnerbyId, deleteShopOwner, updateShopOwner, createShopOwner ,disableUser,enableUser} = require('../controllers/adminControllers')

const router = express.Router()


router.get('/shop-owner',authenticate,isAdmin,getAllShopOwner)
router.get('/shop-owner/:id',authenticate,isAdmin,getAllShopOwnerbyId)
router.delete('/shop-owner/:id',authenticate,isAdmin,deleteShopOwner)
router.put('/shop-owner/:id',authenticate,isAdmin,updateShopOwner)
router.post('/shop-owner',authenticate,isAdmin,createShopOwner)

router.put('/users/:id/disable',authenticate,isAdmin,disableUser)
router.put('/users/:id/enable',authenticate,isAdmin,enableUser)

module.exports = router 