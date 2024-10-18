const { register, login, getUserDetails,update  } = require('../controllers/userContoller.js')
const express = require('express')
const {authenticate } = require('../middleware/authMiddleware.js')
const uploadAvatar = require('../middleware/avatarmulter.js')
const router = express.Router()

router.post("/register",uploadAvatar.single('image'),register)
router.put("/update",authenticate,uploadAvatar.single('image'),update)
router.post("/login",login)
router.get("/getuser",authenticate,getUserDetails)

module.exports = router 