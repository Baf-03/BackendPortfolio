const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const ProjectSchema = require("../model/ProjectSchema");
require("dotenv").config();

const dashboardController = async (req, res) => {
  res.json({
    status: true,
    message: "dashboard api working",
    data: null,
  });
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const UploadImage = async (req, res) => {
  console.log("howe hit api");
  console.log("files", req.files);

  if (!req.files || req.files.length === 0) {
    return res.json({
      status: true,
      message: "No new image uploaded",
      data: null,
    });
  }

  const uploadPromises = req.files.map(file => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.path, { folder: 'your-folder-name' }, (error, data) => {
        if (error) {
          console.error("Upload error:", error);
          fs.unlinkSync(file.path);
          return reject("Could not upload image to Cloudinary, try again");
        }
        resolve(data.secure_url);
        fs.unlinkSync(file.path);
      });
    });
  });

  try {
    const urls = await Promise.all(uploadPromises);
    res.json({
      message: "Images uploaded",
      data: urls,
    });
  } catch (error) {
    res.json({
      message: error,
      data: null,
    });
  }
};

const createProjectController = async (req, res) => {
  const { name, shortDetail, liveLink, projectLink, projectImages } = req.body;
  if (!name || !shortDetail || !liveLink || !projectLink || !projectImages) {
    res.json({
      status: false,
      message: "all fields are required",
      data: null,
    });
    return;
  }
  const objToSend = {
    name,
    short_detail: shortDetail,
    live_link: liveLink,
    project_link: projectLink,
    project_images: projectImages,
  };
  const created_project = await ProjectSchema.create(objToSend);
  console.log("howa create", created_project);
  res.json({
    status: true,
    data: created_project,
    message: "api hitted !",
  });
};

const findUserController = async (req, res) => {
  const { projectName } = req.body;
  if (!projectName) {
    res.json({
      status: false,
      message: "req fields are missing",
      data: null,
    });
  }
  const projectDetails = await ProjectSchema.find({
    name: { $regex: projectName, $options: "i" },
  });
  // const projectDetails = await ProjectSchema.find({ name: projectName });
  if (!projectDetails.length) {
    res.json({
      status: false,
      message: "Project Name Not Found",
      data: null,
    });
    return;
  }
  res.json({
    status: true,
    message: "Project details found",
    data: projectDetails,
  });
};

const findProjectById = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.json({
      message: "required fields are missing",
      data: null,
      status: false,
    });
    return;
  }
  const getProject = await ProjectSchema.findById(id);
  res.json({
    message: "id exist for given id",
    status: true,
    data: getProject,
  });
};

// const updateProjectController = async (req, res) => {};

const updateProjectController = async (req, res) => {
  const { id, name, shortDetail, liveLink, projectLink, projectImages } =
    req.body;
  if (
    !id ||
    !name ||
    !shortDetail ||
    !liveLink ||
    !projectLink ||
    !projectImages
  ) {
    res.json({
      status: false,
      message: "all fields are required",
      data: null,
    });
    return;
  }
  const objToSend = {
    name,
    short_detail: shortDetail,
    live_link: liveLink,
    project_link: projectLink,
    project_images: projectImages,
  };
  console.log("obj", objToSend);
  const updatedProject = await ProjectSchema.findByIdAndUpdate(
    id,
    objToSend,
    { new: true } // To return the updated document
  );

  // const created_project = await ProjectSchema.create(objToSend);
  console.log("howa create", updatedProject);
  res.json({
    status: true,
    data: updatedProject,
    message: "api hitted !",
  });
};
module.exports = {
  dashboardController,
  UploadImage,
  createProjectController,
  findUserController,
  findProjectById,
  updateProjectController,
};
