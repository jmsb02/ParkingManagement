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

// 비밀번호 필드를 포함하여 사용자 정보를 업데이트
const updateUser = async (userId, user) => {
    const response = await axios.patch(`${BASE_URL}/${userId}`, user);
    return response.data;
};

// 사용자 객체에 비밀번호를 추가하여 업데이트할 수 있도록 예시
const updateUserWithPassword = async (userId, user, password) => {
    const updatedUser = { ...user, password }; // 비밀번호 추가
    const response = await axios.patch(`${BASE_URL}/${userId}`, updatedUser);
    return response.data;
};

const deleteUser = async (userId) => {
    await axios.delete(`${BASE_URL}/${userId}`);
};

// 추가 정보 정의
const additionalInformation = `
    <h3>Additional Information</h3>
    <p>여기에 추가적인 정보를 제공할 수 있습니다.</p>
    <p>예: 사용자 가이드, FAQ, 또는 최신 공지사항 등을 포함할 수 있습니다.</p>
`;

// 모듈 내보내기
export {
    signUp,
    signIn,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserWithPassword, // 새로운 함수 내보내기
    deleteUser,
    additionalInformation,
};
