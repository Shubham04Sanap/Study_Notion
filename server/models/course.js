const mongoose = require("mongoose");

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
  ratingAndReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    }
  ],
  price: {
    type:Number,
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