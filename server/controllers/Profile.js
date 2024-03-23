const Profile = require("../models/Profile")
const User = require("../models/User")

exports.updateProfile = async(req, res) =>{
  try{
    //get data
    const {dOB="", about="", contactNumber, gender} = req.body
    const id = req.user.id

    //validate
    if(!contactNumber || !gender || !id){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    //find user profile
    const userDetails = await User.findById(id)
    const profileId = userDetails.profileDetails
    const profileUpdate = await Profile.findById(profileId)

    //update profile
    profileUpdate.DOB = dOB
    profileUpdate.Gender = gender
    profileUpdate.contactNumber = contactNumber
    await profileUpdate.save();

    //return response
    return res.status(200).json({
      success:true,
      message:"profile updated successfully",
      profileUpdate
    })

  }catch(error){
    return res.status(500).json({
      success:false,
      message: "Internal server error, couldn't update profle"
    })
  }
} 

//try scheduling delete operation
exports.deleteAccount = async(req,res) =>{
  try{
    const {userId} = req.user.id
    const userdetails = await !User.findById(userId)
    if(!userdetails){
      return res.status(400).json({
        message:"user not found"
      })
    }

    await Profile.findByIdAndDelete({_id: userdetails.profileDetails})
    await User.findByIdAndDelete({_id: userId})

    return res.status(200).json({
      success:true,
      message:"user deleted successfully"
    })
  }catch(error){

  }
}