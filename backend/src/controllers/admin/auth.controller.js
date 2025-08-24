const bcrypt = require("bcryptjs");
const User = require("../../models/admin/Account.js");
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, deleted: false });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng!" });
        }
        res.json({
            message: "Đăng nhập thành công!",
            user: {
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar,
                role_id: user.role_id,
                token: user.token
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
}