import axios from "axios";




export const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    httpsAgent: process.env.NODE_ENV === 'production'? true: false,
    headers: {
        "Content-Type": "application/json",
    },
});