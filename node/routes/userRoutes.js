const { register, login, getUserDetails,update, resendOtp, getWishList,  } = require('../controllers/userContoller.js')
const {authenticate } = require('../middleware/authMiddleware.js')
const uploadAvatar = require('../middleware/avatarmulter.js')
const { verifyOTP } = require('../utils/twilio.js')
const express = require('express')
const router = express.Router()

router.post("/register",register)
router.put("/update",authenticate,update)
router.post("/login",login)               
router.post("/verifyotp",verifyOTP)               
router.post("/resendotp",resendOtp)               
router.get("/getuser",getUserDetails)
router.get("/wish/:userId",getWishList)


module.exports = router 