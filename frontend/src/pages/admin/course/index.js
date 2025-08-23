import './course.scss';

function Courses() {
    const data = [
        {
            id: 1,
            title: "Khóa học 1",
            image: "/#",
            instructor: "Giảng viên 1",
            duration: "10 giờ",
            status: "Đang diễn ra"
        },
        {
            id: 2,
            title: "Khóa học 2",
            image: "/#",
            instructor: "Giảng viên 2",
            duration: "8 giờ",
            status: "Hoàn thành"
        },
        {
            id: 3,
            title: "Khóa học 3",
            image: "/#",
            instructor: "Giảng viên 3",
            duration: "8 giờ",
            status: "Đã hủy"
        }
    ];
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
                                    <th>Thời gian</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((course, index) => (
                                    <tr key={course.id}>
                                        <td>{index + 1}</td>
                                        <td>{course.title}</td>
                                        <td>
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                className="courses__image"
                                            />
                                        </td>
                                        <td>{course.instructor}</td>
                                        <td>{course.duration}</td>
                                        <td>
                                            <span className={`badge ${course.status === "Đang diễn ra" ? "bg-success" : course.status === "Hoàn thành" ? "bg-primary" : "bg-danger"}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn courses__btn-edit">Sửa</button>
                                            <button className="btn courses__btn-delete">Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className=" courses__btn-add">
                            <a href="/admin/courses/add">Thêm khóa học</a>
                        </button>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Courses;
