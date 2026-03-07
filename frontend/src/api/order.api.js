import axiosInstance from "../utils/axiosInstance"

export const createOrder = async (data) => {
    const response = await axiosInstance.post('/order/create', data);
    return response.data;
}