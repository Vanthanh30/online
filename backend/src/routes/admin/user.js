const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload.js");
const { createUser } = require("../../controllers/admin/user.controller.js");

router.post("/create", upload.single("avatar"), createUser);

module.exports = router;
