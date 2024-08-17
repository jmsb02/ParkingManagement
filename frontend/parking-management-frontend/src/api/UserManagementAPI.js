// UserAPI.js
import api from './api';

// 회원 가입
export const signUp = async (userDTO) => {
    const response = await api.post('/users/signUp', userDTO);
    return response.data; // 사용자 ID (Long)
};

// 로그인
export const signIn = async (userDTO) => {
    const response = await api.post('/users/signIn', userDTO);
    return response.data; // User 객체 (JSON)
};

// 전체 사용자 조회
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data; // List<User> (JSON 배열)
};

// 특정 사용자 조회
export const getUserById = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data; // User 객체 (JSON)
};

// 사용자 정보 수정
export const updateUser = async (userId, userDTO) => {
    const response = await api.patch(`/users/${userId}`, userDTO);
    return response.data; // 수정된 User 객체 (JSON)
};

// 사용자 삭제
export const deleteUser = async (userId) => {
    await api.delete(`/users/${userId}`);
};
