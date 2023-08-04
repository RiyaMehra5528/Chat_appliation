const { Sequelize } = require("sequelize");
const db = require("../db/db");
const userModel = require("./userModel");

const MessageModel=db.define("Riya_chat_MessageModel",
{
    Id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Msg:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    senderId:{
       type:Sequelize.INTEGER,
       reference:{
        model:userModel,
        key:"Id"
       }
    },
    receiverId:{
        type:Sequelize.INTEGER,
        reference:{
         model:userModel,
         key:"Id"
        }
     }
})

module.exports=MessageModel