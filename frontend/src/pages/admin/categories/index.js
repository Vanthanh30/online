import "./categories.scss"
import { useEffect, useState } from 'react';
import { getCategoryTree, deleteCategory } from "../../../services/admin/categoryService";
import { useNavigate, useLocation } from 'react-router-dom';

function CategoriesPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Hàm flatten categories thành mảng phẳng với prefix
    const flattenCategories = (categories, prefix = "") => {
        return categories.flatMap((cat) => {
            const current = {
                ...cat,
                displayTitle: prefix + cat.title,
            };
            const children = flattenCategories(cat.children || [], prefix + "-");
            return [current, ...children];
        });
    };

    // Fetch dữ liệu
    const fetchCategories = async () => {
        try {
            const res = await getCategoryTree();
            const flat = flattenCategories(res);
            setData(flat);
        } catch (err) {
            console.error("Lỗi khi fetch categories:", err);
        }
    };

    useEffect(() => {
        // Nếu navigate kèm reload thì fetch lại
        if (location.state?.reload) {
            fetchCategories();
        } else if (data.length === 0) {
            // load lần đầu
            fetchCategories();
        }
    }, [location.state]);

    // Xóa category
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (err) {
                console.error("Lỗi khi xóa category:", err);
            }
        }
    };

    // Sửa category
    const handleEdit = (id) => {
        navigate(`/admin/categories/edit/${id}`);
    };

    return (
        <div className="categories">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="categories__title">Danh sách khóa học</h1>

                        <table className="categories__table">
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Tên danh mục</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>{index + 1}</td>
                                        <td>{category.displayTitle}</td>
                                        <td>
                                            <span
                                                className={`badge ${category.status === "active" ? "bg-success" : "bg-danger"}`}
                                            >
                                                {category.status === "active"
                                                    ? "Hoạt động"
                                                    : "Ngừng hoạt động"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn categories__btn-edit"
                                                onClick={() => handleEdit(category._id)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="btn categories__btn-delete"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className="categories__btn-add">
                            <a href="/admin/categories/create">Thêm danh mục</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriesPage;
