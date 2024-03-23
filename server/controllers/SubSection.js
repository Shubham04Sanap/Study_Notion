const Section = require("../models/section");
const SubSection = require("../models/subSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async(req,res) =>{
  try{
    //fetch the data
    const {sectionID, title, timeDuration, description} = req.body;
    const video = req.files.videoFiles;

    //data validation
    if(!sectionID || !title || !timeDuration || !description || !video){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      })
    }

    //upload video to cloduinary
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    //create sub-section
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })

    //update sub-sectionID in section
    const updatedSection = await Section.findByIdAndUpdate({_id: sectionID},
                      {$push:{
                        subSection:subSectionDetails._id,
                      }},
                      {new:true})
                      .populate("subSection");
    
    return res.status(200).json({
      success:true,
      message:"sub section created successfully",
      updatedSection,
    })

  }catch{
    return res.status(500).json({
      success:false,
      message: "Internal server error",
    })
  }
}