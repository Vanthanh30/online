const Course = require("../../models/admin/Course");
const cloudinary = require("../../configs/cloudinary");

const createCourse = async (req, res) => {
    try {
        const {
            title,
            category,
            level,
            language,
            instructor,
            status,
            description,
            createdBy
        } = req.body;

        if (!title || !instructor) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin bắt buộc" });
        }

        // ✅ Parse time
        // ✅ Parse time
        let time = { startDate: null, endDate: null, durationHours: 0 };

        if (req.body.time) {
            try {
                const parsed = JSON.parse(req.body.time);
                time = {
                    startDate: parsed.startDate ? new Date(parsed.startDate) : null,
                    endDate: parsed.endDate ? new Date(parsed.endDate) : null,
                    durationHours: parsed.durationHours ? Number(parsed.durationHours) : 0,
                };
            } catch (err) {
                console.warn("⚠️ Không parse được req.body.time, fallback sang dạng time[startDate]");
                time = {
                    startDate: req.body["time[startDate]"] ? new Date(req.body["time[startDate]"]) : null,
                    endDate: req.body["time[endDate]"] ? new Date(req.body["time[endDate]"]) : null,
                    durationHours: req.body["time[durationHours]"] ? Number(req.body["time[durationHours]"]) : 0,
                };
            }
        }


        // ✅ Parse pricing
        let pricing = { price: 0, discount: 0, finalPrice: 0 };

        if (req.body.pricing) {
            try {
                const parsed = JSON.parse(req.body.pricing);
                const price = Number(parsed.price || 0);
                const discount = Math.min(Math.max(Number(parsed.discount || 0), 0), 100);
                const finalPrice = Math.round(price * (1 - discount / 100));
                pricing = { price, discount, finalPrice };
            } catch (err) {
                console.warn("⚠️ Không parse được req.body.pricing, fallback sang dạng pricing[price]");
                const price = Number(req.body["pricing[price]"] || 0);
                const discount = Math.min(Math.max(Number(req.body["pricing[discount]"] || 0), 0), 100);
                const finalPrice = Math.round(price * (1 - discount / 100));
                pricing = { price, discount, finalPrice };
            }
        }


        // ✅ Parse curriculum
        let curriculum = [];
        if (req.body.curriculum) {
            try {
                curriculum = JSON.parse(req.body.curriculum);
            } catch (err) {
                console.error("❌ Lỗi parse curriculum:", err);
            }
        }

        // ✅ Upload ảnh & video
        let imageUrl = req.files?.["imageUrl"] ? req.files["imageUrl"][0].path : null;
        let videoUrl = req.files?.["videoUrl"] ? req.files["videoUrl"][0].path : null;
        // ✅ Tạo course
        const newCourse = new Course({
            title,
            category,
            level,
            language,
            instructor,
            status,
            time,
            media: { imageUrl, videoUrl },
            pricing,
            description,
            curriculum,
            createdBy: {
                account_id: createdBy?.account_id || null
            }
        });

        await newCourse.save();

        return res.status(201).json({
            message: "Thêm khóa học thành công",
            data: newCourse
        });

    } catch (error) {
        console.error("❌ Lỗi khi thêm khóa học:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Khóa học không tồn tại" });
        }
        return res.status(200).json({
            message: "Lấy thông tin khóa học thành công",
            data: course
        });
    } catch (error) {
        console.error("❌ Lỗi khi lấy thông tin khóa học:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json({
            message: "Lấy danh sách khóa học thành công",
            data: courses
        });
    } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách khóa học:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
const editCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Không tìm thấy khóa học" });

        const { title, category, level, language, instructor, status, description } = req.body;

        // ✅ Cập nhật field cơ bản
        course.title = title || course.title;
        course.category = category || course.category;
        course.level = level || course.level;
        course.language = language || course.language;
        course.instructor = instructor || course.instructor;
        course.status = status || course.status;
        course.description = description || course.description; // 👈 thêm dòng này

        // ✅ Parse time
        if (req.body.time) {
            try {
                course.time = typeof req.body.time === "string"
                    ? JSON.parse(req.body.time)
                    : req.body.time;
            } catch {
                console.warn("⚠️ Không parse được time");
            }
        }

        // ✅ Parse pricing
        if (req.body.pricing) {
            try {
                let parsed = typeof req.body.pricing === "string"
                    ? JSON.parse(req.body.pricing)
                    : req.body.pricing;
                const price = Number(parsed.price || 0);
                const discount = Math.min(Math.max(Number(parsed.discount || 0), 0), 100);
                const finalPrice = Math.round(price * (1 - discount / 100));
                course.pricing = { price, discount, finalPrice };
            } catch {
                console.warn("⚠️ Không parse được pricing");
            }
        }

        // ✅ Parse curriculum
        if (req.body.curriculum) {
            try {
                course.curriculum = typeof req.body.curriculum === "string"
                    ? JSON.parse(req.body.curriculum)
                    : req.body.curriculum;
            } catch {
                console.warn("⚠️ Không parse được curriculum");
            }
        }

        // ✅ Cập nhật file media nếu có
        if (req.files?.imageUrl) course.media.imageUrl = req.files.imageUrl[0].path;
        if (req.files?.videoUrl) course.media.videoUrl = req.files.videoUrl[0].path;

        await course.save();
        res.status(200).json({ message: "Cập nhật thành công", data: course });
    } catch (err) {
        console.error("❌ Lỗi khi cập nhật khóa học:", err);
        res.status(500).json({ message: "Lỗi khi cập nhật khóa học", error: err.message });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "Khóa học không tồn tại" });
        }
        return res.status(200).json({ message: "Xóa khóa học thành công" });
    } catch (error) {
        console.error("❌ Lỗi khi xóa khóa học:", error);
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourseById,
    getCourses,
    editCourse,
    deleteCourse
};