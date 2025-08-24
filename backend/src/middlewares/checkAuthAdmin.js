const Account = require("../models/admin/Account");

const checkAuthAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ message: "Chưa đăng nhập" });
        }

        const user = await Account.findOne({ token });

        if (!user) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }

        if (user.role_id !== "admin") {
            return res.status(403).json({ message: "Bạn không có quyền admin" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = checkAuthAdmin;
