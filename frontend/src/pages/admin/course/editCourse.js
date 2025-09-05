import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './course.scss';
import TextEditor from '../../../components/TinyMCE/index';
import { getCourseId, editCourse } from "../../../services/admin/courseService";
import { getCategory } from "../../../services/admin/categoryService";

const levels = ['Cơ bản', 'Trung cấp', 'Nâng cao'];
const languages = ['Tiếng Việt', 'Tiếng Anh'];

function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    // state cơ bản
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("Cơ bản");
    const [language, setLanguage] = useState("Tiếng Việt");
    const [instructor, setInstructor] = useState("");
    const [status, setStatus] = useState("Sắp khai giảng");
    const [description, setDescription] = useState("");
    const [categoryList, setCategoryList] = useState([]);

    // state thời gian
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [durationHours, setDurationHours] = useState(0);

    // state pricing
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const finalPrice = Math.round(price * (1 - discount / 100));

    // state media
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [imageURL, setImageURL] = useState(""); // preview ảnh đã lưu
    const [videoURL, setVideoURL] = useState(""); // preview video đã lưu

    // state curriculum
    const [modules, setModules] = useState([]);

    // load course + categories
    useEffect(() => {
        getCourseId(id).then(res => {
            const c = res.data;
            setTitle(c.title);
            setCategory(c.category);
            setLevel(c.level);
            setLanguage(c.language);
            setInstructor(c.instructor);
            setStatus(c.status);
            setDescription(c.description || "");
            setStartDate(c.time?.startDate?.substring(0, 10) || "");
            setEndDate(c.time?.endDate?.substring(0, 10) || "");
            setDurationHours(c.time?.durationHours || 0);
            setPrice(c.pricing?.price || 0);
            setDiscount(c.pricing?.discount || 0);
            setModules(c.curriculum || []);
            setImageURL(c.media?.imageUrl || "");
            setVideoURL(c.media?.videoUrl || "");
        });

        getCategory().then(res => setCategoryList(res.categories || []));
    }, [id]);

    // =================== CRUD cho module/lesson ===================
    const addModule = () => {
        setModules([...modules, { id: Date.now(), title: "", lessons: [] }]);
    };

    const removeModule = (id) => {
        setModules(modules.filter(m => m.id !== id));
    };

    const updateModuleTitle = (id, value) => {
        setModules(modules.map(m => m.id === id ? { ...m, title: value } : m));
    };

    const addLesson = (moduleId) => {
        setModules(modules.map(m =>
            m.id === moduleId ? { ...m, lessons: [...m.lessons, { id: Date.now(), title: "" }] } : m
        ));
    };

    const removeLesson = (moduleId, lessonId) => {
        setModules(modules.map(m =>
            m.id === moduleId ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } : m
        ));
    };

    const updateLessonTitle = (moduleId, lessonId, value) => {
        setModules(modules.map(m =>
            m.id === moduleId
                ? { ...m, lessons: m.lessons.map(l => l.id === lessonId ? { ...l, title: value } : l) }
                : m
        ));
    };

    // =================== Submit ===================
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("level", level);
        formData.append("language", language);
        formData.append("instructor", instructor);
        formData.append("status", status);
        formData.append("description", description);

        formData.append("time", JSON.stringify({ startDate, endDate, durationHours }));
        formData.append("pricing", JSON.stringify({ price, discount, finalPrice }));
        formData.append("curriculum", JSON.stringify(modules));

        if (imageFile) formData.append("imageUrl", imageFile);
        if (videoFile) formData.append("videoUrl", videoFile);

        await editCourse(id, formData);
        navigate("/admin/courses"); // quay lại danh sách
    };

    // =================== Media Preview ===================
    const onImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setImageURL(URL.createObjectURL(file));
    };

    const onVideoChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
        setVideoURL(URL.createObjectURL(file));
    };

    return (
        <div className="add-course">
            <div className="add-course__header">
                <h1>Chỉnh sửa khóa học</h1>
                <div className="add-course__header-actions">
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
                            <select
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {Array.isArray(categoryList) && categoryList.length > 0 ? (
                                    categoryList.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.title}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Chưa có danh mục</option>
                                )}
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
                        <TextEditor value={description} onChange={setDescription} />
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
                        <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={durationHours}
                            onChange={e => setDurationHours(Number(e.target.value))}
                        />
                    </div>

                    <div className="panel">
                        <div className="panel__title">🖼 Ảnh đại diện</div>
                        <input type="file" accept="image/*" className="form-control" onChange={onImageChange} />
                        {imageURL && <img className="preview-image" src={imageURL} alt="preview" />}
                    </div>

                    <div className="panel">
                        <div className="panel__title">🎬 Video giới thiệu</div>
                        <input type="file" accept="video/*" className="form-control" onChange={onVideoChange} />
                        {videoURL && <video className="preview-video" src={videoURL} controls />}
                    </div>

                    <div className="panel">
                        <div className="panel__title">💰 Học phí</div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Giá gốc (VNĐ)</label>
                                <input type="number" min="0" className="form-control" value={price} onChange={e => setPrice(Number(e.target.value))} />
                            </div>
                            <div className="form-group">
                                <label>Giảm giá (%)</label>
                                <input type="number" min="0" max="100" className="form-control" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
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

export default EditCourse;
