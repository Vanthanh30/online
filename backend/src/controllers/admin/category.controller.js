const Category = require("../../models/admin/categories");
const tree = require("../../helpers/createTree");

const createCategory = async (req, res) => {
    try {
        const { title, description, parentId, status, position } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Vui lòng nhập tên danh mục." });
        }

        const newCategory = new Category({
            title,
            description,
            parentId: parentId || "", // 👈 giữ string rỗng nếu không chọn
            status: status || "active",
            position: position || 0,
        });

        await newCategory.save();

        res.status(201).json({
            message: "Tạo danh mục thành công!",
            category: newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getParentCategories = async (req, res) => {
    try {
        const categories = await Category.find({ parentId: "", deleted: false });
        res.json({ categories: categories || [] });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", categories: [] });
    }
};

const getCategoryTree = async (req, res) => {
    try {
        const categories = await Category.find({ deleted: false }).lean();
        const categoryTree = tree.tree(categories);
        res.status(200).json(categoryTree);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// [GET] /api/admin/categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ deleted: false });
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", categories: [] });
    }
};
// PUT /api/admin/categories/:id
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, parent_id, status, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                title,
                parent_id: parent_id || "",
                status,
                description,
            },
            { new: true } // trả về bản ghi đã update
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById({ _id: id, deleted: false });

        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// [DELETE] /api / admin / categories /: id(soft delete + cascade)
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        // Hàm đệ quy xóa mềm tất cả con cháu
        const softDeleteCascade = async (catId) => {
            await Category.findByIdAndUpdate(catId, {
                deleted: true,
                deletedAt: new Date()
            });

            const children = await Category.find({ parentId: catId, deleted: false });
            for (const child of children) {
                await softDeleteCascade(child._id);
            }
        };

        await softDeleteCascade(id);

        res.status(200).json({ message: "Xóa danh mục và tất cả danh mục con thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = {
    createCategory,
    getParentCategories,
    getCategoryTree,
    getCategories,
    editCategory,
    deleteCategory,
    getCategoryById,
};
