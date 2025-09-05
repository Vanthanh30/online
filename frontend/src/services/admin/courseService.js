import axios from "axios";
const API_URL = "http://localhost:5000/api/admin/courses";

export const createCourse = async (data) => {
    const res = await axios.post(API_URL + "/create", data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};
export const getCourseId = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};
export const getCourses = async () => {
    const res = await axios.get(`${API_URL}`);
    return res.data;
};
// services/admin/courseService.js
export const editCourse = async (id, data) => {
    const res = await axios.put(`${API_URL}/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
};
export const deleteCourse = async (id) => {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
}
