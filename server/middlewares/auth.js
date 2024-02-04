const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.auth = async(req,res) =>{
  try{
    const token  = req.cookies.token 
                   || req.body.token
                   || req.header("Authorisation").replace("Bearer","");
  
    if(!token){
      res.status(401).json({
        success:false,
        message:"Token is missing",
      })
    }   
    
    try{
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    }catch(error){
      res.status(401).json({
        success:false,
        message:"Token is invalid",
      })
    }
    next();
  
  }catch(err){
    res.status(501).json({
      success:false,
      message:"somthing went wrong while validating token",
    })
  }
}

ex