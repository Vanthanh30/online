const User = require("../../models/admin/Account.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../configs/cloudinary.js");

const createUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, role_id, status } = req.body;

        // check trùng email
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

        // upload avatar lên cloudinary
        let avatarUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "users",
            });
            avatarUrl = result.secure_url;
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            phone,
            avatar: avatarUrl,
            role_id,
            status,
        });

        await newUser.save();
        res.status(201).json({ message: "Tạo tài khoản thành công", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = { createUser };
