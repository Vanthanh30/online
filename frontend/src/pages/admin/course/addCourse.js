import { useMemo, useState } from 'react';
import './course.scss';
import TextEditor from '../../../components/TinyMCE/index';

const categories = ['Lập trình', 'Thiết kế', 'Marketing', 'Kinh doanh'];
const levels = ['Cơ bản', 'Trung cấp', 'Nâng cao'];
const languages = ['Tiếng Việt', 'Tiếng Anh'];

export default function AddCourse() {
    // Basic fields
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [level, setLevel] = useState(levels[0]);
    const [language, setLanguage] = useState(languages[0]);
    const [instructor, setInstructor] = useState('');
    const [status, setStatus] = useState('Sắp khai giảng');

    // Time
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [durationHours, setDurationHours] = useState(''); // ví dụ: tổng số giờ

    // Media
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');

    // Commerce
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(''); // %
    const finalPrice = useMemo(() => {
        const p = Number(price) || 0;
        const d = Math.min(Math.max(Number(discount) || 0, 0), 100);
        return p > 0 ? Math.round(p * (1 - d / 100)) : 0;
    }, [price, discount]);

    // Description
    const [description, setDescription] = useState('');

    // Curriculum (Modules & Lessons)
    const [modules, setModules] = useState([
        { id: crypto.randomUUID(), title: 'Giới thiệu', lessons: [{ id: crypto.randomUUID(), title: 'Tổng quan khóa học' }] }
    ]);

    const addModule = () => {
        setModules(m => [...m, { id: crypto.randomUUID(), title: `Chương ${m.length + 1}`, lessons: [] }]);
    };

    const removeModule = (moduleId) => {
        setModules(m => m.filter(x => x.id !== moduleId));
    };

    const updateModuleTitle = (moduleId, value) => {
        setModules(m => m.map(md => md.id === moduleId ? { ...md, title: value } : md));
    };

    const addLesson = (moduleId) => {
        setModules(m => m.map(md =>
            md.id === moduleId
                ? { ...md, lessons: [...md.lessons, { id: crypto.randomUUID(), title: `Bài ${md.lessons.length + 1}` }] }
                : md
        ));
    };

    const updateLessonTitle = (moduleId, lessonId, value) => {
        setModules(m => m.map(md =>
            md.id === moduleId
                ? { ...md, lessons: md.lessons.map(ls => ls.id === lessonId ? { ...ls, title: value } : ls) }
                : md
        ));
    };

    const removeLesson = (moduleId, lessonId) => {
        setModules(m => m.map(md =>
            md.id === moduleId
                ? { ...md, lessons: md.lessons.filter(ls => ls.id !== lessonId) }
                : md
        ));
    };

    // Media handlers
    const onImageChange = (e) => {
        const file = e.target.files?.[0];
        setImageFile(file || null);
        setImageURL(file ? URL.createObjectURL(file) : '');
    };

    const onVideoChange = (e) => {
        const file = e.target.files?.[0];
        setVideoFile(file || null);
        setVideoURL(file ? URL.createObjectURL(file) : '');
    };

    const resetForm = () => {
        setTitle('');
        setCategory(categories[0]);
        setLevel(levels[0]);
        setLanguage(languages[0]);
        setInstructor('');
        setStatus('Sắp khai giảng');
        setStartDate('');
        setEndDate('');
        setDurationHours('');
        setImageFile(null); setImageURL('');
        setVideoFile(null); setVideoURL('');
        setPrice(''); setDiscount('');
        setDescription('');
        setModules([{ id: crypto.randomUUID(), title: 'Giới thiệu', lessons: [{ id: crypto.randomUUID(), title: 'Tổng quan khóa học' }] }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!title.trim()) return alert('Vui lòng nhập Tên khóa học');
        if (!instructor.trim()) return alert('Vui lòng nhập Giảng viên');

        const payload = {
            title,
            category,
            level,
            language,
            instructor,
            status,
            time: { startDate, endDate, durationHours },
            media: { imageFileName: imageFile?.name || null, videoFileName: videoFile?.name || null },
            pricing: { price: Number(price) || 0, discount: Number(discount) || 0, finalPrice },
            description,           // HTML từ TinyMCE
            curriculum: modules.map(m => ({
                title: m.title,
                lessons: m.lessons.map(l => ({ title: l.title }))
            }))
        };

        console.log('Payload gửi lên server:', payload);
        alert('Đã chuẩn bị dữ liệu. Kiểm tra console để xem payload!');
        // TODO: Gọi API upload media (Cloudinary) + tạo khóa học
    };

    return (
        <div className="add-course">
            <div className="add-course__header">
                <h1>Thêm khóa học mới</h1>
                <div className="add-course__header-actions">
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Làm mới</button>
                    <button form="add-course-form" className="btn btn-primary">Lưu khóa học</button>
                </div>
            </div>

            <form id="add-course-form" className="add-course__form" onSubmit={handleSubmit}>
                {/* Left column */}
                <div className="add-course__left">
                    <div className="form-group">
                        <label htmlFor="title">Tên khóa học</label>
                        <input id="title" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    <div className="grid-3">
                        <div className="form-group">
                            <label>Danh mục</label>
                            <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Trình độ</label>
                            <select className="form-control" value={level} onChange={e => setLevel(e.target.value)}>
                                {levels.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ngôn ngữ</label>
                            <select className="form-control" value={language} onChange={e => setLanguage(e.target.value)}>
                                {languages.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mô tả chi tiết</label>
                        <TextEditor onChange={setDescription} />
                    </div>

                    <div className="panel">
                        <div className="panel__title">📚 Nội dung khóa học</div>
                        <div className="modules">
                            {modules.map((md) => (
                                <div key={md.id} className="module">
                                    <div className="module__header">
                                        <input
                                            className="form-control"
                                            value={md.title}
                                            onChange={(e) => updateModuleTitle(md.id, e.target.value)}
                                            placeholder="Tên chương"
                                        />
                                        <div className="module__actions">
                                            <button type="button" className="btn btn-light" onClick={() => addLesson(md.id)}>+ Bài học</button>
                                            <button type="button" className="btn btn-danger" onClick={() => removeModule(md.id)}>Xóa chương</button>
                                        </div>
                                    </div>

                                    <div className="lessons">
                                        {md.lessons.map(ls => (
                                            <div key={ls.id} className="lesson">
                                                <input
                                                    className="form-control"
                                                    value={ls.title}
                                                    onChange={(e) => updateLessonTitle(md.id, ls.id, e.target.value)}
                                                    placeholder="Tên bài học"
                                                />
                                                <button type="button" className="btn btn-ghost" onClick={() => removeLesson(md.id, ls.id)}>✕</button>
                                            </div>
                                        ))}
                                        {md.lessons.length === 0 && <div className="muted">Chưa có bài học</div>}
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline" onClick={addModule}>+ Thêm chương</button>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="add-course__right">
                    <div className="form-group">
                        <label>Giảng viên</label>
                        <input className="form-control" value={instructor} onChange={e => setInstructor(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Trạng thái</label>
                        <select className="form-control" value={status} onChange={e => setStatus(e.target.value)}>
                            <option>Sắp khai giảng</option>
                            <option>Đang diễn ra</option>
                            <option>Hoàn thành</option>
                            <option>Đã hủy</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Ngày bắt đầu</label>
                        <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Ngày kết thúc</label>
                        <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Thời lượng (giờ)</label>
                        <input type="number" min="0" className="form-control" value={durationHours} onChange={e => setDurationHours(e.target.value)} />
                    </div>

                    <div className="panel">
                        <div className="panel__title">🖼 Ảnh đại diện</div>
                        <input type="file" accept="image/*" className="form-control" onChange={onImageChange} />
                        {imageURL && <img className="preview-image" src={imageURL} alt="preview" />}
                    </div>

                    <div className="panel">
                        <div className="panel__title">🎬 Video giới thiệu</div>
                        <input type="file" accept="video/*" className="form-control" onChange={onVideoChange} />
                        {videoURL && (
                            <video className="preview-video" src={videoURL} controls />
                        )}
                    </div>

                    <div className="panel">
                        <div className="panel__title">💰 Học phí</div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Giá gốc (VNĐ)</label>
                                <input type="number" min="0" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Giảm giá (%)</label>
                                <input type="number" min="0" max="100" className="form-control" value={discount} onChange={e => setDiscount(e.target.value)} />
                            </div>
                        </div>
                        <div className="final-price">
                            Giá sau giảm: <strong>{finalPrice.toLocaleString()} VNĐ</strong>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
