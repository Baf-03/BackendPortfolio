const express = require("express");
const { SignUpController, LoginUpController } = require("../controllers/authController");
const { authMiddleware } = require("../middleware");
const { UploadImage ,dashboardController, createProjectController, findUserController, findProjectById, updateProjectController} = require("../controllers/postController");
const upload = require("../utils/multer");
const router = express.Router()

router.post("/api/signup",SignUpController)
router.post("/api/login",LoginUpController)
router.post("/api/dashboard",[authMiddleware],dashboardController)
router.post("/api/uploadimage",upload.any("image"),UploadImage)
router.post("/api/createproject",[authMiddleware],createProjectController)
router.post("/api/finduser",[authMiddleware],findUserController)
router.post("/api/findprojectbyid",[authMiddleware],findProjectById)
router.post("/api/findprojectbyidandupdate",[authMiddleware],updateProjectController)



module.exports = router