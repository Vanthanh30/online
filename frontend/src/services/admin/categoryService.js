import axios from "axios";
const API_URL = "http://localhost:5000/api/admin/categories";

export const getCategoryTree = async () => {
    const res = await axios.get(`${API_URL}/tree`);
    return res.data;
};

export const createCategory = async (data) => {
    const res = await axios.post(`${API_URL}/create`, data);
    return res.data;
};
export const getCategory = async () => {
    const res = await axios.get(`${API_URL}`);
    return res.data; // { categories: [...] }
};
export const getCategoryById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};
export const editCategory = async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
};
export const deleteCategory = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};

