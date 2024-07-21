const { default: mongoose } = require('mongoose')
const monogoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: monogoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  description: {
    type: String,
  }
})

module.exports = mongoose.model("Tag",tagSchema)