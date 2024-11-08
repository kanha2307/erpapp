const express = require('express')
const { authenticate, isShopOWner } = require('../middleware/authMiddleware')
const { getProductsByRadius, createProducts, getProductsByOwner, deleteProducts, getAllProducts, getProductsById } = require('../controllers/productControllers')
const upload = require('../middleware/multer.js')
const router = express.Router()

router.post('/search',getProductsByRadius)
router.get('/getall',getAllProducts)
router.get('/productbyowner',getProductsByOwner)
router.get('/productbyid/:id',getProductsById)

router.post('/create',authenticate,isShopOWner,upload.single('image'),createProducts)
router.delete('/delete',authenticate,isShopOWner,deleteProducts)
module.exports = router 