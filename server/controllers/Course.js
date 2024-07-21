
const Course = require("../models/Course")
const User = require("../models/User")
const Tag = require("../models/Tag")

const {uploadImageToCloudinary} = require('../utils/imageUploader')

//create course handler
exports.createCourse = async(req,res)=>{
  try{
    const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

    const thumbnail = req.files.thumbnailImage;

    if(!courseDescription || !courseName || !whatYouWillLearn || !price || !thumbnail || !tag){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      })
    }
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId); 

    if(!instructorDetails){
      return res.status(400).json({
        success: false,
        message: 'Instructor not found',
      })
    }

    const tagDetails = await Tag.findById(tag)
    if(!tagDetails){
      return res.status(404).json({
        success: false,
        message: 'tag details not found'
      })
    }

    const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails,
      price,
      whatYouWillLearn: whatYouWillLearn,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    }) 

    await User.findByIdAndUpdate({
      _id:instructorDetails._id},
      {$push:{
        courses: newCourse._id
      }},
      {new:true},)

      return res.status(200).json({
        success: true,
        message:"course created successfully",
        data:newCourse,
      })

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message: "cannot create course!"
    })
  }
}

exports.showAllCourses = async(req,res) =>{
  try{
    const allCourses = await Course.find({},
                                        {courseName:true, 
                                         price:true, 
                                         instructor:true, 
                                         thumbnail:true, 
                                         ratingAndReview:true, 
                                         studentEnrolled:true}).
                                         populate("instructor").
                                         exec();

    res.status(200).json({
      success:true,
      message:"data fetched for all courses",
      data: allCourses,
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message: "cannot fetch courses!"
    })
  }
}