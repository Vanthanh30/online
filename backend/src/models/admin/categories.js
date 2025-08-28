const mongoose = require('mongoose');
const { Schema } = mongoose;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const categorySchema = new Schema({
    title: String,
    description: String,
    parentId: {
        type: String,
        default: "",
    },
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
