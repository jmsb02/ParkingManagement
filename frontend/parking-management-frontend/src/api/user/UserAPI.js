import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/users';

const signUp = async (user) => {
    const response = await axios.post(`${BASE_URL}/signUp`, user);
    return response.data;
};

const signIn = async (user) => {
    const response = await axios.post(`${BASE_URL}/signIn`, user);
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

const getUserById = async (userId) => {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
};

const updateUser = async (userId, user) => {
    const response = await axios.patch(`${BASE_URL}/${userId}`, user);
    return response.data;
};

const deleteUser = async (userId) => {
    await axios.delete(`${BASE_URL}/${userId}`);
};

// 모듈 내보내기
export {
    signUp,
    signIn,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
