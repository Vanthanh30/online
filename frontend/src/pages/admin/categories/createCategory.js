import './categories.scss';
import { useState, useEffect } from 'react';
import { createCategory, getCategoryTree } from '../../../services/admin/categoryService';
import TextEditor from '../../../components/TinyMCE/index';
import React from 'react';
import { useNavigate } from "react-router-dom";
function Categories() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [parentId, setParentId] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('active');
    const [parentList, setParentList] = useState([]);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const data = await getCategoryTree(); // lấy luôn cây danh mục
                setParentList(data);
            } catch (err) {
                console.error("Lỗi lấy danh mục cha:", err);
            }
        };
        fetchParents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            title,
            parentId: parentId || "",
            description,
            status
        };

        try {
            const res = await createCategory(newCategory);
            alert(res.message || "Thêm danh mục thành công!");
            setTitle('');
            setParentId('');
            setDescription('');
            setStatus('active');
            navigate("/admin/categories");
        } catch (err) {
            console.error("Lỗi khi thêm danh mục:", err);
            alert(err.response?.data?.message || "Có lỗi xảy ra");
        }
    };

    const renderOptions = (items, level = 0) => {
        return items.map((item) => (
            <React.Fragment key={item._id}>
                <option value={item._id}>
                    {`${"-- ".repeat(level)}${item.title}`}
                </option>
                {item.children && item.children.length > 0 && renderOptions(item.children, level + 1)}
            </React.Fragment>
        ));
    };

    return (
        <div className="categories-page">
            <h1>Thêm mới danh mục</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên danh mục</label>
                    <input
                        type="text"
                        placeholder="Nhập tên danh mục"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Danh mục cha</label>
                    <select
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                    >
                        <option value="">-- Không chọn --</option>
                        {renderOptions(parentList)}
                    </select>

                </div>

                <div className='form-group'>
                    <label>Trạng thái</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
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

export default Categories;
