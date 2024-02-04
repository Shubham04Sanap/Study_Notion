const User = require("../models/user");
const mailSender = require("../utils/mailSender");

exports.forgotPassword = async(req,res)=>{
  try{
  const email = req.body.email;
  const user = await User.findOne({email:email});
  if(!user){
    res.json({
      success:false,
      message:"your email is not registered",
    })
  }
  const token = crypto.randomUUID(); 
  const updatedDetails = await User.findOneAndUpdate(
    {email:email},
    {
      token:token,
      forgotPasswordExpires:Date.now + 5*60*1000,
    },
    {new:true})

  const url = `http://localhost:3000/update-password/${token}`;

  await mailSender(email,
                    "Password reset link",
                    `Password reset link: ${url}`);
  
  res.status(200).json({
    success:true,
    message: "Email sent successfully, please change your password using the link"
  })
  }catch(error){
    console.error(error);
    res.status(500).json({
      success:false,
      message:"email couldn't be sent",
    })
  }
}