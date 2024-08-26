// parkingSpaceAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/parking-spaces';

// 주차 공간 생성
export const createParkingSpace = async (parkingSpace) => {
    try {
        const response = await axios.post(BASE_URL, parkingSpace);
        return response.data;
    } catch (error) {
        console.error('Error creating parking space:', error);
        throw error;
    }
};

// 모든 주차 공간 조회
export const getAllParkingSpaces = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all parking spaces:', error);
        throw error;
    }
};

// 특정 주차 공간 조회
export const getParkingSpaceById = async (parkingId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${parkingId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching parking space with ID ${parkingId}:`, error);
        throw error;
    }
};

// 주차 공간 업데이트
export const updateParkingSpace = async (parkingId, parkingSpace) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${parkingId}`, parkingSpace);
        return response.data;
    } catch (error) {
        console.error(`Error updating parking space with ID ${parkingId}:`, error);
        throw error;
    }
};

// 주차 상태 변경
export const changeParkingSpaceStatus = async (parkingId, status) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${parkingId}/status`, status);
        return response.data;
    } catch (error) {
        console.error(`Error changing status for parking space with ID ${parkingId}:`, error);
        throw error;
    }
};

// 주차 공간 삭제
export const deleteParkingSpace = async (parkingId) => {
    try {
        await axios.delete(`${BASE_URL}/${parkingId}`);
    } catch (error) {
        console.error(`Error deleting parking space with ID ${parkingId}:`, error);
        throw error;
    }
};
