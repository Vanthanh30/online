import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/users";

export const createUser = async (data) => {
    return await axios.post(`${API_URL}/create`, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
};
