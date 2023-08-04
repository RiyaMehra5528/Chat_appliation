const userModel = require("../Model/userModel")
const jwt=require("jsonwebtoken")
const MessageModel = require("../Model/MessageModel")
const { Op } = require("sequelize")

exports.registerUser=async(req,res)=>
{
    const {uname,email,password,r_password}=req.body
   try{
    const user=await userModel.create({
     Name:uname,
     Email:email,
     Password:password,
     RepeatPassword:r_password
    })
     return res.status(200).json({success:true,msg:"USER CREATED SUCCESSFULLY"})
}
catch(e)
{
   return  res.status(404).json({success:false,msg:"Error"})
}
}

exports.loginUser=async(req,res)=>
{
    const {email,password}=req.body
 try{
    const user=await userModel.findOne({where:{Email:email}})
    if(!user)
    {
        return res.status(200).json({success:true,msg:"NO USER FOUND BY GIVEN EMAIL"})
    }
    console.log(user)
    const match= await user.Password===password
    if(!match)
    {
        return res.status(200).json({success:true,msg:"PASSWORD INCORRECT"})
    }
    console.log("match=",match)
    console.log("token")
    const token=jwt.sign({user:user},"KEEPSMILING")
    console.log("token generated")
    return res.status(200).json({success:true,msg:"LOGIN SUCCESSFULLY",token:token,Id:user.Id})

 }
catch(e)
{
    return res.status(404).json({success:false,msg:"ERROR"})
}
}

exports.getUser=async(req,res)=>
{
    try{
        const users=await userModel.findAll()
        console.log("user=",users)
        return res.status(200).json({success:true,users:users})
    }
    catch(e)
    {
      return res.status(200).json({success:false,msg:"ERROR"})
    }
}

exports.getUserId=async(req,res)=>
{
    const {uname}=req.query
    console.log("uname to find id=",uname)
    try{
         const user=await userModel.findOne({where:{Name:uname}})
         return res.status(200).json({success:true,Id:user.Id})
    }
    catch(e)
    {
        res.status(404).json({success:false,msg:"Error"})
    }
}

exports.sendMessage=async(req,res)=>
{
    const {s_id,r_id,msg}=req.body
    console.log(s_id,r_id,msg)
    try{
        const message=await MessageModel.create({
            senderId:s_id,
            receiverId:r_id,
            Msg:msg
        })
        return res.status(200).json({success:true,message:message})
    }
    catch(e)
    {
        return res.status(404).json({success:false,msg:"Error"})
    }
}

exports.getMsg=async(req,res)=>
{
    const {s_id,r_id}=req.query
    console.log(s_id,r_id)
    try{
        const message=await MessageModel.findAll(
            {where:
            {
                [Op.and]:[
                    {[Op.or]:{
                        senderId:[s_id,r_id]}},
                    {[Op.or]:{
                        receiverId:[s_id,r_id]}}
                ]
            }}
        )
        console.log("this is response", message)
        return res.status(200).json({success:true,message:message})
    }
    catch(e)
    {
        return res.status(404).json({success:false,msg:"Error"})
    }
}