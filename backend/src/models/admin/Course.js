const mongoose = require('mongoose');
const { Schema } = mongoose;
const courseSchema = new Schema({
    title: String,
    category: String,
    level: String,
    language: String,
    instructor: String,
    status: String,
    time: {
        startDate: Date,
        endDate: Date,
        durationHours: Number
    },
    media: {
        imageUrl: String,
        videoUrl: String
    },
    pricing: {
        price: Number,
        discount: Number,       // %
        finalPrice: Number
    },
    description: String,      // HTML mô tả chi tiết

    curriculum: [
        {
            _id: ObjectId,
            title: String,        // Tên chương
            lessons: [
                {
                    _id: ObjectId,
                    title: String     // Tên bài học
                }
            ]
        }
    ],
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updatedBy: [{
        account_id: String,
        updateAt: Date
    }],
}, {
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

