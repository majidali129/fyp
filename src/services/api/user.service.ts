import { apiClient } from "@/lib/axios-client";


export const registerUser = async (data: any) => {
  const response = await apiClient.post(`/users/sign-up`, data, {
    headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const loginUser = async (data: {email: string, password: string}) => {
    const response = await apiClient.post(`/users/sign-in`, data)
    return response.data
}

export const forgotPassword = async (data: {email: string}) => {
    const response = await apiClient.post(`/users/forgot-password`, data)
    return response.data
}
export const resetPassword = async (data: {token: string , newPassword:string}) => {
    const response = await apiClient.post(`/users/reset-password`, data)
    return response.data
}
export const updatePassword = async (data: {oldPassword: string, newPassword: string}) => {
    const response = await apiClient.patch(`/users/change-password`, data)
    return response.data
}