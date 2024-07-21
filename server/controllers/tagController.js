const Tag = require("../models/Tag")

exports.createTag = async (req, res)=>{
  try{
    const {name, description} = req.body
    if(name || descripton){
      return res.status(400).json({
        success:false,
        message: 'all fields required '
      })
    }

    const tagDetails = await Tag.create({
      name: name,
      description: description,
    })

    return res.status(200).json({
      success:true,
      message: 'tag created successfully'
    })

  }catch{
    res.status(500).json({
      success:false,
      message: 'error occurred'
    })
  }
}

exports.showAllTags = async (req, res)=>{
  try{
    const allTags = await Tag.find({},{name: true, description:true})

    res.status(200).json({
      success:true,
      message: 'All tags retrieved successfully'
    })
  }catch{
    res.status(500).json({
      success:false,
      message: 'error occurred'
    })
  }
}