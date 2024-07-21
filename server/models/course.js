const mongoose = require("mongoose");
const Tag = require("./Tag");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescription: {
    type: String,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
  },
  whatYouWillLearn:{
    type:String,
  },
  ratingAndReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    }
  ],
  price: {
    type:Number,
  },
  tag:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Tag
  },
  thumbnail: {
    type:String,
  },
  studentEnrolled: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
})

module.exports = mongoose.model("Course",courseSchema);