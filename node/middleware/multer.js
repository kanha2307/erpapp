const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,res,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const fileFilter = (req,res,cb)=>{
    const fileType = /jpge|jpg|png/;
    const extname = fileType.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileType.test(path.mimetype)

    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb(res.status(400).json({message:'Only jpeg,jpg,png are allowed'}))
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:fileFilter,

})

module.exports = upload