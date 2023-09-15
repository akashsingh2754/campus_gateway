const mongoose = require('mongoose')

const IdeaSchema = new mongoose.Schema({
  FullName:{
    type:String,
  },
  email: {
    type: String,
  },
  ContactNo: {
    type: String,
  },
  Address: {
    type: String,
  },
  DOB: {
    type: Number,
  },
  twlmarks: {
    type: Number,
  },
  tenmarks: {
    type: Number,
  },
  category: {
    type: String,
  },
  course: {
    type: String,
  },
})

const Idea = mongoose.model("Idea", IdeaSchema)

module.exports = Idea
