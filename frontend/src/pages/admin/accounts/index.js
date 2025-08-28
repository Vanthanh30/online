import './account.scss'
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../../services/admin/userService';
import { useNavigate } from 'react-router-dom';
function AdminAccountsPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const res = await getUsers();
                setData(res.data.users || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAccounts();
    }, []);
    const handleEdit = (id) => {
        navigate(`/admin/accounts/edit/${id}`);
    };
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            try {
                await deleteUser(id);
                setData(data.filter((item) => item._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };
    return (
        <div className="accounts">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="accounts__title">Danh sách tài khoản</h1>

                        <table className="accounts__table">
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên tài khoản</th>
                                    <th>Email</th>
                                    <th>Vai trò</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((account, index) => (
                                    <tr key={account._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={account.avatar}
                                                alt={account.fullName}
                                                className="accounts__image"
                                            />
                                        </td>
                                        <td>{account.fullName}</td>
                                        <td>{account.email}</td>
                                        <td>{account.role_id}</td>
                                        <td>
                                            <span className={`badge ${account.status === "Đang hoạt động" ? "bg-success" : account.status === "Đã khóa" ? "bg-danger" : "bg-warning"}`}>
                                                {account.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn accounts__btn-edit" onClick={() => handleEdit(account._id)}>Sửa</button>
                                            <button className="btn accounts__btn-delete" onClick={() => handleDelete(account._id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className="accounts__btn-add">
                            <a href="/admin/accounts/create">Thêm tài khoản</a>
                        </button>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default AdminAccountsPage;