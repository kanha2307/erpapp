const { register, login, getUserDetails,update  } = require('../controllers/userContoller.js')
const express = require('express')
const {authenticate } = require('../middleware/authMiddleware.js')
const uploadAvatar = require('../middleware/avatarmulter.js')
const router = express.Router()

router.post("/register",uploadAvatar.single('avatar'),register)
router.put("/update",authenticate,uploadAvatar.single('avatar'),update)
router.post("/login",login)
router.get("/getuser",getUserDetails)

module.exports = router 