import "./course.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../services/admin/courseService.js";
import Pagination from "../../../components/Pagination/index.js";

function Courses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    // 👉 State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;

    // Gọi API lấy courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getCourses();
                // API trả về { message, data: [...] }
                setCourses(res.data || []);
            } catch (err) {
                console.error("❌ Lỗi khi lấy danh sách khóa học:", err);
            }
        };
        fetchCourses();
    }, []);

    // Tính toán dữ liệu phân trang
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    // Edit course
    const handleEdit = (id) => {
        navigate(`/admin/courses/edit/${id}`);
    };

    // Delete course
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
                                {currentCourses.length > 0 ? (
                                    currentCourses.map((course, index) => (
                                        <tr key={course._id}>
                                            <td>{indexOfFirstCourse + index + 1}</td>
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
                                            <td>{course.instructor || "Chưa có"}</td>
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
                                                    {course.status || "Chưa cập nhật"}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn courses__btn-edit"
                                                    onClick={() => handleEdit(course._id)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="btn courses__btn-delete"
                                                    onClick={() => handleDelete(course._id)}
                                                >
                                                    Xóa
                                                </button>
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

                        {/* 👉 Pagination đặt ngoài bảng */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />

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
