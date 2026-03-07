import adminAxios from "../utils/adminAxios"

export const adminLogin = async (data) => {
    const response = await adminAxios.post('/admin/login',data);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await adminAxios.get('/admin/users');
    return response.data;
}

export const uploadProducts = async (data) => {
    const response = await adminAxios.post('/product/upload-product', data);
    return response.data;
}

export const getAllProducts = async () => {
    const response = await adminAxios.get('/product/get-all-products');
    return response.data;
}

export const deleteProduct = async (productSku) => {
    const response = await adminAxios.delete(`/product/delete-product/${productSku}`);
    return response.data;
}

export const updateSettings = async (data) => {
    const response = await adminAxios.put('/admin/settings',data);
    return response.data;
}