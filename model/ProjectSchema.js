const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  short_detail: {
    type: String,
    required: true,
  },
  live_link: {
    type: String,
    required: true,
  },
  project_link: {
    type: String,
    required: true,
  },
  project_images:{
    type:[String],
    required:true
  }
});
const ProjectSchema = mongoose.model("projectData", schema);
module.exports = ProjectSchema;
