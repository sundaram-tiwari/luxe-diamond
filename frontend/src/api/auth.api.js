import axiosInstance from "../utils/axiosInstance";

export const signup = (data) => {
    axiosInstance.post('/auth/signup',data);
}

export const signin = (data) => {
    axiosInstance.post('/auth/signin',data);
}