const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true,
  },
  lastName:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true,
  },
  contactNumber:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  accountType:{
    type:String,
    enum:["Admin","Student","Instrcutor"],
  },
  profileDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  token:{
    type:String,
  },
  forgotPasswordExpires:{
    type:Date,
  },
  courses:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ],
  image:{
    type:String,
    required:true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseProgress"
    }
  ],
  otp:{
    type:Number,
  }
})

module.exports = mongoose.model("User",userSchema)