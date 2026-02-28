import axiosInstance from "../utils/axiosInstance"

export const uploadProducts = async (data) => {
    const response = await axiosInstance.post('/product/upload-product', data);
    return response.data;
}

export const getAllProducts = async () => {
    const response = await axiosInstance.get('/product/get-all-products');
    return response.data;
}

export const getCategory = async () => {
    const response = await axiosInstance.get('/product/category');
    return response.data;
}

export const getNewArrivals = async () => {
    const response = await axiosInstance.get('/product/new-arrivals');
    return response.data;
}

export const getProducts = async (category) => {
    const response = await axiosInstance.get(`/product/get-products/${category}`,);
    return response.data;
}

export const getProductDetails = async (category,sku) => {
    const response = await axiosInstance.get(`/product/get-products/${category}/${sku}`,);
    return response.data;
}