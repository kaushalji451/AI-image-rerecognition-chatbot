import axios from "axios";
const API = `${import.meta.env.VITE_BACKEND_URL}`;

export const registerUser = async (email: String, password: String) =>
    await axios.post(`${API}/auth/register`, { email, password });

export const loginUser = async (email: String, password: String) =>
    await axios.post(`${API}/auth/login`, { email, password });

export const getProfile = async (token: String) =>
    await axios.get(`${API}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });