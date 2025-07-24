const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const route = require('./src/routes/index.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//session
app.use(session({
    secret: 'vintent',  // Bạn có thể đặt gì cũng được
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true nếu dùng https
        maxAge: 1000 * 60 * 60 * 24
    }
}));
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
// CORS
app.use(cors());
route(app);
app.use(express.json());
//// Khởi động server
app.listen(PORT, () => {
    console.log(` Server đang chạy tại http://localhost:${PORT}`);
});
