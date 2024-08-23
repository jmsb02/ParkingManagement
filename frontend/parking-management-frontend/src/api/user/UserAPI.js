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
    deleteUser,
    additionalInformation,
};
