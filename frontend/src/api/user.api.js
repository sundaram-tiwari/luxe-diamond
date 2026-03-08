import axiosInstance from "../utils/axiosInstance"

export const getUserProfile = async () => {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
}

export const updateUserProfile = async (data) => {
    const response = await axiosInstance.put("/user/update-profile",data);
    return response.data;
}

export const updateUserAddress = async (data) => {
    const response = await axiosInstance.put("/user/update-address",data);
    return response.data;
}