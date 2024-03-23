const mongoose = require("mongoose");

const profileModal = new mongoose.Schema({
  Name: {
    type:String,
    require:true
  },
  Gender: {
    type: String
  },
  DOB: {
    type: String
  },
  contactNumber: {
    type: Number,
    require: true,
  }
})

module.exports = mongoose.model("Profile" ,profileModal)