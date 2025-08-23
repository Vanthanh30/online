import './categories.scss';
import { useState, useEffect } from 'react';

import TextEditor from '../../../components/TinyMCE/index';

function Categories() {
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [description, setDescription] = useState('');
    const [parentList, setParentList] = useState([]);

    useEffect(() => {

        setParentList([
            { id: 1, name: 'Công nghệ' },
            { id: 2, name: 'Ẩm thực' },
            { id: 3, name: 'Du lịch' }
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCategory = {
            name,
            parentCategory,
            description
        };

        console.log('Dữ liệu gửi lên backend:', newCategory);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Danh mục cha</label>
                    {parentList.length > 0 ? (
                        <select
                            value={parentCategory}
                            onChange={(e) => setParentCategory(e.target.value)}
                        >
                            <option value="">-- Chọn danh mục cha --</option>
                            {parentList.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            placeholder="Nhập danh mục cha"
                            value={parentCategory}
                            onChange={(e) => setParentCategory(e.target.value)}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Mô tả</label>
                    <TextEditor onChange={(content) => setDescription(content)} />
                </div>

                <button type="submit" className="btn-submit">Lưu</button>
            </form>
        </div>
    );
}

export default Categories;
