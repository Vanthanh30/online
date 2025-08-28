
const createCourse = async (req, res) => {
    try {
        const { title, description, instructor, duration } = req.body;
        const newCourse = new Course({ title, description, instructor, duration });
        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
