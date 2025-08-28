const User = require("../../models/admin/Account.js");
const bcrypt = require("bcryptjs");
const cloudinary = require("../../configs/cloudinary.js");

const createUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, role_id, status } = req.body;

        // Kiểm tra email trùng
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

        // Hash password và upload avatar song song
        const hashPromise = bcrypt.hash(password, 10);
        let avatarPromise = Promise.resolve({ secure_url: "" });

        if (req.file) {
            avatarPromise = cloudinary.uploader.upload(req.file.path, { folder: "users" });
        }

        const [hashedPassword, avatarResult] = await Promise.all([hashPromise, avatarPromise]);
        const avatarUrl = avatarResult.secure_url;

        // Tạo user
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
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ deleted: false });
        res.json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, email, phone, role_id, status } = req.body;

        // Kiểm tra user tồn tại
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Cập nhật thông tin user
        user.fullName = fullName || user.fullName;
        user.password = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password;
        user.email = email || user.email;
        user.avatar = req.file ? (await cloudinary.uploader.upload(req.file.path, { folder: "users" })).secure_url : user.avatar;
        user.phone = phone || user.phone;
        user.role_id = role_id || user.role_id;
        user.status = status || user.status;

        await user.save();
        res.json({ message: "Cập nhật thông tin thành công", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
const deletedUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { deleted: true });
        res.json({ message: "Xóa người dùng thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
}
module.exports = { createUser, getUsers, getById, editUser, deletedUser };
