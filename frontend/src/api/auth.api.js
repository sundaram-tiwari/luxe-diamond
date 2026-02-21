import axiosInstance from "../utils/axiosInstance";

export const signup = async (data) => {
    const response = await axiosInstance.post('/auth/signup', data);
    return response;
}
export const verifyEmail = async (token, email) => {
    const response = await axiosInstance.post(`/auth/verify-email/${token}`, email);
    return response.data;
}

export const login = async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
}

export const resendEmail = async (data) => {
    const response = await axiosInstance.post('/auth/resend-verification-email/', data);
    return response.data;
}

export const checkEmailVerificationStatus = async (data) => {
    const response = await axiosInstance.post('/auth/email-verification-status/', data);
    return response.data;
}

export const forgetPassword = async (data) => {
    const response = await axiosInstance.post('/auth/forget-password/', data);
    return response.data;
}

export const resetPassword = async (token,data) => {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, data);
    return response.data;
}

