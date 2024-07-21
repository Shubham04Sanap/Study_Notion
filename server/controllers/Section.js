const Course = require("../models/Course")
const Section = require("../models/Section")

async function createSection (req,res){
  try{
    //1.fetch the data
    const {sectionName, courseId} = req.body

    //2.validate the data
    if(!sectionName || !courseId){
      return res.status(400).json({
        success:false,
        message:"section name or courseId cannot be empty",
      })
    }

    //3.create the section
    const section = await Section.create({sectionName})
    
    //4.update the section in the course db 
    const updatedCourse = await Course.findByIdAndUpdate(
                                  courseId,
                                  {$push: 
                                  {courseContent:section._id}}, 
                                  {new:true})

    return res.status(200).json({
      success:true,
      message: "your section got created"
    })
                            
  }catch(error){
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Couldn't create section"
    })
  }
}

export default createSection;

exports.updateSection = async (req,res){
  try{
    //data input
    const {sectionName, sectionId} = req.body;
    //data validation
    if(!sectionName || !sectionId){
      return res.status(400).json({
        success:false,
        message:"missing properties",
      })
    }
    //update data
    const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

    return res.status(200).json({
      success:true,
      message:"section got updated,"
    })
  }catch{
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Couldn't update section"
    })
  }
}

exports.deleteSection = async(req, res)=>{
  try{
    const {secID} = req.body;
    await Section.findByIdAndDelete(secID);

    return res.status(200).json({
      success:true,
      message:"section deleted successfully",
    })
  }catch{
    return res.status(500).json({
      success:false,
      message:"Couldn't delete section"
    })
  }
}