import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, editUser } from "../../../services/admin/userService";
import "./account.scss";

function EditAccount() {
    const { id } = useParams();
    console.log("User ID:", id)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        role_id: "user",
        status: "active",
    });
    const [preview, setPreview] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    // Lấy dữ liệu user theo id khi load trang
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(id);
                const user = res.data.user;
                setFormData({
                    fullName: user.fullName,
                    email: user.email,
                    password: "", // bỏ trống, chỉ nhập nếu muốn đổi
                    phone: user.phone,
                    role_id: user.role_id,
                    status: user.status,
                });
                setPreview(user.avatar); // ảnh từ DB
            } catch (err) {
                console.error(err);
                alert("Không lấy được dữ liệu user");
            }
        };
        fetchUser();
    }, [id]);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý chọn ảnh
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Toggle trạng thái
    const handleToggleStatus = () => {
        setFormData({
            ...formData,
            status: formData.status === "active" ? "inactive" : "active",
        });
    };

    // Cancel
    const handleCancel = () => {
        navigate(-1);
    };

    // Submit cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            if (avatar) {
                data.append("avatar", avatar);
            }

            await editUser(id, data);
            alert("Cập nhật thành công!");
            navigate("/admin/accounts");
        } catch (err) {
            console.error(err);
            alert("Lỗi khi cập nhật user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-user">
            <div className="card">
                <h1 className="card-title">✏️ Sửa tài khoản</h1>

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
                        <label>Mật khẩu (bỏ trống nếu không đổi)</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu mới"
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

export default EditAccount;
