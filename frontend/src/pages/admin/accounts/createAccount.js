import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../services/admin/userService";
import "./account.scss";

function AddUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        role_id: "user",
        status: "active",
    });
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false); // trạng thái gửi

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleToggleStatus = () => {
        setFormData({
            ...formData,
            status: formData.status === "active" ? "inactive" : "active",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // tránh bấm nhiều lần
        setLoading(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        if (avatar) data.append("avatar", avatar);

        try {
            const res = await createUser(data);
            alert(res.data.message);
            navigate("/admin/accounts");
        } catch (err) {
            alert(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }

    };
    const handleCancel = () => {
        navigate(-1); // quay lại trang trước
    };
    return (
        <div className="add-user">
            <div className="card">
                <h1 className="card-title">➕ Thêm tài khoản</h1>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Họ tên</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Nhập họ tên"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div className="form-group">
                        <label>Vai trò</label>
                        <select
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>
                    <div className="form-group toggle-status">
                        <label>Trạng thái</label>
                        <div
                            className={`switch ${formData.status === "active" ? "active" : ""}`}
                            onClick={handleToggleStatus}
                        >
                            <div className="slider">
                                {formData.status === "active" ? "✔" : "✖"}
                            </div>
                        </div>
                        <span className="status-text">
                            {formData.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Ảnh đại diện</label>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                        {preview && (
                            <div className="avatar-preview">
                                <img src={preview} alt="preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
