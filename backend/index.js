const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const route = require('./src/routes/admin/index.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// session
app.use(expressSession({
    secret: 'vintent',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // đổi thành true nếu dùng HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 ngày
    }
}));

// connect DB
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log(' Connected to MongoDB'))
    .catch((err) => console.error(' Error connecting to MongoDB:', err));

// routes
route(app);

// start server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
