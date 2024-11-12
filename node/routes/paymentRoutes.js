const express = require('express')
const { createPaymentOrder,verifyPayment } = require('../controllers/paymentController')
const router = express.Router()

router.post('/create-order',createPaymentOrder)
router.post('/verify-payment',verifyPayment)

module.exports = router