import "./course.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../services/admin/courseService.js";

function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getCourses();
                setCourses(res.data); // API trả { message, data: [...] }
            } catch (err) {
                console.error("❌ Lỗi khi lấy danh sách khóa học:", err);
            }
        };
        fetchCourses();
    }, []);
    const handleEdit = (id) => {
        navigate(`/admin/courses/edit/${id}`);
    };
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa khóa học này?");
        if (confirmDelete) {
            deleteCourse(id)
                .then((res) => {
                    alert(res.message);
                    setCourses(courses.filter((course) => course._id !== id));
                })
                .catch((err) => {
                    console.error("❌ Lỗi khi xóa khóa học:", err);
                });
        }
    };
    return (
        <div className="courses">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="courses__title">Danh sách khóa học</h1>

                        <table className="courses__table">
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Tên khóa học</th>
                                    <th>Hình ảnh</th>
                                    <th>Giảng viên</th>
                                    <th>Thời gian (giờ)</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 ? (
                                    courses.map((course, index) => (
                                        <tr key={course._id}>
                                            <td>{index + 1}</td>
                                            <td>{course.title}</td>
                                            <td>
                                                {course.media?.imageUrl ? (
                                                    <img
                                                        src={course.media.imageUrl}
                                                        alt={course.title}
                                                        className="courses__image"
                                                    />
                                                ) : (
                                                    "Chưa có ảnh"
                                                )}
                                            </td>
                                            <td>{course.instructor}</td>
                                            <td>{course.time?.durationHours || 0}</td>
                                            <td>
                                                <span
                                                    className={`badge ${course.status === "Đang diễn ra"
                                                        ? "bg-success"
                                                        : course.status === "Hoàn thành"
                                                            ? "bg-primary"
                                                            : "bg-danger"
                                                        }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn courses__btn-edit" onClick={() => handleEdit(course._id)}>Sửa</button>
                                                <button className="btn courses__btn-delete" onClick={() => handleDelete(course._id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>
                                            Không có khóa học nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <button className="courses__btn-add">
                            <a href="/admin/courses/add">Thêm khóa học</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;
