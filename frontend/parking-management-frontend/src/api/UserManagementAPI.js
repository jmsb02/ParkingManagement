import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/users';

export const signUp = async (user) => {
    const response = await axios.post(`${BASE_URL}/signUp`, user);
    return response.data;
};

export const signIn = async (user) => {
    const response = await axios.post(`${BASE_URL}/signIn`, user);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
};

export const updateUser = async (userId, user) => {
    const response = await axios.patch(`${BASE_URL}/${userId}`, user);
    return response.data;
};

export const deleteUser = async (userId) => {
    await axios.delete(`${BASE_URL}/${userId}`);
};
