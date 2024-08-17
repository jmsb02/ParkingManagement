import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8084/api', // 백엔드 서버의 기본 URL
});

export default api;
