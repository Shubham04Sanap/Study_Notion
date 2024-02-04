const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.auth = async(req, res, next) =>{
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

exports.isInstructor = async(req, res, next) =>{
  try{
    const role = req.user.accountType;

    if(role !== "Student"){
      res.status(401).json({
        success:false,
        message:"This is a protected route for student only!",
      })
    }
  }catch(error){
    res.status(501).json({
      success:false,
      message:"user cannot be verified",
    })
  }
}

exports.isInstructor = async(req, res, next) =>{
  try{
    const role = req.user.accountType;

    if(role !== "Instructor"){
      res.status(401).json({
        success:false,
        message:"This is a protected route for Instructor only!",
      })
    }
  }catch(error){
    res.status(501).json({
      success:false,
      message:"user cannot be verified",
    })
  }
}

exports.isAdmin = async(req, res, next) =>{
  try{
    const role = req.user.accountType;

    if(role !== "Admin"){
      res.status(401).json({
        success:false,
        message:"This is a protected route for Admin only!",
      })
    }
  }catch(error){
    res.status(501).json({
      success:false,
      message:"user cannot be verified",
    })
  }
}