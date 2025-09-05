const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload.js");
const controller = require("../../controllers/admin/course.controller.js");

router.post("/create", upload.fields([{ name: "imageUrl" }, { name: "videoUrl" }]), controller.createCourse);
router.get("/", controller.getCourses);
router.get("/:id", controller.getCourseById);
router.put("/edit/:id", upload.fields([{ name: "imageUrl" }, { name: "videoUrl" }]), controller.editCourse);
router.delete("/delete/:id", controller.deleteCourse);
module.exports = router;
