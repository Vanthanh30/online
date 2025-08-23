const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        return cb(new Error("Chỉ hỗ trợ file ảnh (jpg, jpeg, png)"));
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
