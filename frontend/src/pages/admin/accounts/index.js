import './account.scss'
function AdminAccountsPage() {
    const data = [
        {
            id: 1,
            image: "https://via.placeholder.com/150",
            name: "Nguyễn Văn A",
            email: "a@example.com",
            role: "Admin",
            status: "Đang hoạt động"
        },
        {
            id: 2,
            image: "https://via.placeholder.com/150",
            name: "Trần Thị B",
            email: "b@example.com",
            role: "Editor",
            status: "Đang hoạt động"
        },
        {
            id: 3,
            image: "https://via.placeholder.com/150",
            name: "Lê Văn C",
            email: "c@example.com",
            role: "Viewer",
            status: "Đang hoạt động"
        }
    ];
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
                                    <tr key={account.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={account.image}
                                                alt={account.name}
                                                className="accounts__image"
                                            />
                                        </td>
                                        <td>{account.name}</td>
                                        <td>{account.email}</td>
                                        <td>{account.role}</td>
                                        <td>
                                            <span className={`badge ${account.status === "Đang hoạt động" ? "bg-success" : account.status === "Đã khóa" ? "bg-danger" : "bg-warning"}`}>
                                                {account.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn accounts__btn-edit">Sửa</button>
                                            <button className="btn accounts__btn-delete">Xóa</button>
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