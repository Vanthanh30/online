import { useState, useEffect } from 'react';
import { editCategory, getCategoryById, getCategoryTree } from '../../../services/admin/categoryService';
import { useParams, useNavigate } from "react-router-dom";
import TextEditor from '../../../components/TinyMCE/index';

function EditCategories() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [parentId, setParentId] = useState("");
    const [status, setStatus] = useState("active");
    const [description, setDescription] = useState("");
    const [parentList, setParentList] = useState([]);

    useEffect(() => {
        // load parent categories
        getCategoryTree().then(setParentList);

        // load category detail
        getCategoryById(id).then((data) => {
            setTitle(data.title);
            setParentId(data.parent_id || "");
            setStatus(data.status);
            setDescription(data.description || "");
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editCategory(id, {
                title,
                parent_id: parentId,
                status,
                description,
            });
            alert("Cập nhật thành công!");
            navigate("/admin/categories"); // quay lại danh sách
        } catch (error) {
            console.error(error);
            alert("Cập nhật thất bại!");
        }
    };

    const renderOptions = (categories, level = 0) => {
        return categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
                {"-".repeat(level) + " " + cat.title}
            </option>
        ))
            .concat(
                categories.flatMap((cat) =>
                    cat.children ? renderOptions(cat.children, level + 1) : []
                )
            );
    };

    return (
        <div className="categories-page">
            <h1>Sửa danh mục</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên danh mục</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Danh mục cha</label>
                    <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
                        <option value="">-- Không chọn --</option>
                        {renderOptions(parentList)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Trạng thái</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Ngừng hoạt động</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <TextEditor value={description} onChange={(content) => setDescription(content)} />

                </div>

                <button type="submit" className="btn-submit">Lưu</button>
            </form>
        </div>
    );
}

export default EditCategories;
