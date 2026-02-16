import axiosInstance from "../utils/axiosInstance";

export const signup = async (data) => {
    const response = await axiosInstance.post('/auth/signup',data);
    return response.data;
}
export const verifyEmail = async (token) => {
    const response = await axiosInstance.post(`/auth/verify-email/${token}`);
    return response.data;
}

export const signin = (data) => {
    const response = axiosInstance.post('/auth/signin',data);
    return response.data;
}