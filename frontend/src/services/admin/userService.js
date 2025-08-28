import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/users";

export const createUser = async (data) => {
    return await axios.post(`${API_URL}/create`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};
export const getUsers = async () => {
    return await axios.get(API_URL);
}
export const getUserById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};
export const editUser = async (id, data) => {
    return await axios.put(`${API_URL}/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};
export const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/delete/${id}`);

}