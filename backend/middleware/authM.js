const e = require('express');
const Joi = require('joi');

exports.validate_mid=(req,res,next)=>
{
//  try{
    const schema=Joi.object(
        {
            uname:Joi.string().alphanum().min(3).max(30).required(),
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            r_password:Joi.string().required().valid(Joi.ref('password')),
          
        }
    )
    const {error}=schema.validate(req.body)
    if(error) {
        return res.json({msg : error.details[0]})
    }
    else {
        next();
    }
}
// catch{
//     console.log(error)
// }
// }