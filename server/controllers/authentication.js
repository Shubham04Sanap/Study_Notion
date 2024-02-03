const mongoose = require("mongoose");
const User = require("../models/user");
const Otp = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

exports.createOtp = async(req, res) => {
  try{
    const {email} = req.body;
    const alreadyUser = await User.find({email});

    if(alreadyUser){
      res.status(401).json({
        message:"user already exists!",
      })
    }
    
    var otp = otpGenerator.generate(6,{
      upperCaseAlphabets:false,
      lowerCaseAlphabets:false,
      specialChars:false,
    });
    // console.log("otp: ",otp);

    let result = await Otp.findOne({otp:otp});
    while(result){
      var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
      });
      result = await Otp.findOne({otp:otp});
    }

    const otpPayload = {email, otp};
    const otpBody = await Otp.create(otpPayload);

    res.status(200).json({
      message:"otp sent successfully",
      otp,
      success:true,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"something went wrong",
    })
  }
}

exports.signUp = async (req,res) =>{
  
  try{
    const{
      firstName, lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      Otp
    } = req.body;

    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
      return res.status(403).json({
        success:false,
        message:"all fields are required",
      })
    }
    
    if(password !== confirmPassword){
      return res.status(400).json({
        message:"password didn't matched!",
      })
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(400).json({
        message:"user already exists",
      })
    }

    const recentOtp = await Otp.find({email}).sort({createdAt: -1}).limit(1);

    if(recentOtp.length == 0){
      return res.status(400).json({
        success:false,
        message:"otp not found",
      })
    }else if(otp !== recentOtp){
      return res.status(400).json({
        message:"Invalid otp",
      })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password:hashedPassword,
      accountType,
      image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    return res.status(200).json({
      success:true,
      message:"user registered successfully",
      user,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:"user cannot be registered",
    })
  }
}

exports.login = async (req,res) =>{
  try{

  }catch(error){
    
  }
}