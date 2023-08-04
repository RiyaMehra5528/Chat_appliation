const express=require('express')
const router=express.Router()
const {validate_mid}=require('../middleware/authM')
const {registerUser,loginUser,getUser,getUserId,sendMessage,getMsg} =require('../Controller/userController')

router.post("/register",validate_mid,registerUser)
router.post('/login',loginUser)
router.get("/getUser",getUser)
router.get('/getUserId',getUserId)
router.post('/sendMessage',sendMessage)
router.get('/getMsg',getMsg)
module.exports=router