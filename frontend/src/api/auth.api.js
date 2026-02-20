import axiosInstance from "../utils/axiosInstance";

export const signup = async (data) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response;
}
export const verifyEmail = async (token) => {
    const response = await axiosInstance.post(`/auth/verify-email/${token}`);
    return response.data;
}

export const login =async (data) => {
    const response =await axiosInstance.post('/auth/login', data);
    return response;
}

export const resendEmail =async (data) => {
    const response = axiosInstance.post('/auth/resend-verification-email/',data);
    return response.data;
}