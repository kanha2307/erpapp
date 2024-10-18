const express = require('express')
const { authenticate, isShopOWner } = require('../middleware/authMiddleware')
const { getProductsByRadius, createProducts, getProductsByOwner } = require('../controllers/productControllers')
const upload = require('../middleware/multer.js')
const router = express.Router()

router.post('/search',getProductsByRadius)
router.post('/create',authenticate,isShopOWner,upload.single('image'),createProducts)
router.get('/owner',authenticate,isShopOWner,getProductsByOwner)

module.exports = router 