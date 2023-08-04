const Sequelize=require('sequelize')
const db=require('../db/db')

const userModel=db.define("Riya_chat_UserModel",
{
    Id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    Name:{
         type:Sequelize.STRING,
         allowNull:false
          },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        },
        unique:{
            args:true,
        
        }
    },
    Password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    RepeatPassword:{
        type:Sequelize.STRING,
        allowNull:false
        
    }
}

)
module.exports=userModel