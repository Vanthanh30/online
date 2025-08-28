const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload.js");
const controller = require("../../controllers/admin/user.controller.js");

router.post("/create", upload.single("avatar"), controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", controller.getById);
router.put("/edit/:id", upload.single("avatar"), controller.editUser);
router.delete("/delete/:id", controller.deletedUser);
module.exports = router;
