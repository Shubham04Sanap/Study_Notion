const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true,
  },
  otp:{
    type:Number,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now(),
    expires: 5*1000,
  },
});

//Function to send emails for otp verification
async function sendVerificationEmail(email, otp){
  try{
    const mailResponse = await mailSender(email,"Verification email from StudyNotion", otp);
    console.log("mail res",mailResponse);

  }catch(error){
    console.log("Error occured while sending email", error);
    throw error;
  }
}

otpSchema.pre("save", async function(next){
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("Otp", otpSchema);