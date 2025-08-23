const mongoose = require('mongoose');
const { generateRandomString } = require('../../helpers/generate.js');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String, // sẽ hash bằng bcrypt
    token: {
        type: String,
        default: generateRandomString(20)
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: {
        type: String,
        default: "active" // active | inactive
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
