const express = require('express')
const { isAdmin, authenticate } = require('../middleware/authMiddleware')
const { manageUsers, manageShopOwners } = require('../controllers/adminControllers')
const router = express.Router()


router.put('/shop-owner/:id',authenticate,isAdmin,manageShopOwners)
router.delete('/users/:id',authenticate,isAdmin,manageUsers)

module.exports = router 