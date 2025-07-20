import axios from "axios";

export const http = axios.create({
    withXSRFToken: true,
    withCredentials: true,
    baseURL: "http://localhost:8000/"
})