import './dashboard.scss'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses, deleteCourse } from "../../../services/admin/courseService.js";
import { getUsers } from "../../../services/admin/userService.js";
import { FaArrowRight } from "react-icons/fa";
import Pagination from '../../../components/Pagination';
function Dashboard() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;

    // Gọi API lấy danh sách khóa học
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await getCourses();
                if (Array.isArray(res)) {
                    setCourses(res);
                } else if (res?.data && Array.isArray(res.data)) {
                    setCourses(res.data);
                } else {
                    setCourses([]);
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách khóa học:", err);
            }
        };
        fetchCourses();
    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers();
                setUsers(Array.isArray(res) ? res : res.data || []);
            } catch (err) {
                console.error("Lỗi khi lấy users:", err);
            }
        };
        fetchUsers();
    }, []);
    // Xóa khóa học
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
            try {
                await deleteCourse(id);
                setCourses(courses.filter(course => course._id !== id));
            } catch (err) {
                console.error("Lỗi khi xóa khóa học:", err);
            }
        }
    };
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    // Data thống kê
    const data = [
        { title: 'Khóa học', quantity: courses.length, className: 'orange' },
        { title: 'Học viên', quantity: users.length, className: 'blue' }, // TODO: thay bằng API
        { title: 'Doanh thu', quantity: '$5000', className: 'yellow' }, // TODO: thay bằng API
        { title: 'Khóa học hoàn thành', quantity: courses.filter(c => c.status === "Hoàn thành").length, className: 'green' },
    ];

    return (
        <div className="container">
            <div className="row"></div>
            <div className="col-md-12">
                <div className="dashboard">
                    {data.map((item, index) => (
                        <div className={`dashboard-item ${item.className}`} key={index}>
                            <h2>{item.title}</h2>
                            <span className="quantity">{item.quantity}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-md-12">
                <div className="dashboard-list">
                    <h2>Các khóa học</h2>
                    <table className="table-course">
                        <thead>
                            <tr>
                                <th>Tên khóa học</th>
                                <th>Giảng viên</th>
                                <th>Thời gian</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <tr key={course._id}>
                                        <td>{course.title}</td>
                                        <td>{course.instructor || "Chưa có"}</td>
                                        <td>{course.time?.durationHours || "N/A"}</td>
                                        <td>{course.status || "Chưa cập nhật"}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => navigate(`/admin/courses/edit/${course._id}`)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(course._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>Chưa có khóa học</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />

                    <span className='view-more'>
                        <a href="/admin/courses">xem thêm <FaArrowRight /></a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
