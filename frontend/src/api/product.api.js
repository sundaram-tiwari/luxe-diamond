import axiosInstance from "../utils/axiosInstance"

export const uploadProducts = async (data) => {
    const response = await axiosInstance.post('/product/upload-product',data);
    return response.data;
}

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/product/get-all-products');
    return response.data;
}