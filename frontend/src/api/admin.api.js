import axiosInstance from "../utils/axiosInstance"

export const adminLogin = async (data) => {
    const response = await axiosInstance.post('/admin/login',data);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
}

export const getSettings = async () => {
    const response = await axiosInstance.get('/admin/settings');
    return response.data;
}

export const updateSettings = async (data) => {
    const response = await axiosInstance.put('/admin/settings',data);
    return response.data;
}