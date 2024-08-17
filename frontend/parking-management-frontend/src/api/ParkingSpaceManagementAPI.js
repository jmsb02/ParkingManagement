// ParkingSpacesAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/parking-spaces';

// 주차 공간 생성
export const createParkingSpace = async (parkingSpacesDTO) => {
    const response = await axios.post(`${BASE_URL}`, parkingSpacesDTO);
    return response.data; // 주차 공간 ID (Long)
};

// 특정 주차 공간 조회
export const getParkingSpaceById = async (parkingId) => {
    const response = await axios.get(`${BASE_URL}/${parkingId}`);
    return response.data; // ParkingspacesDTO 객체 (JSON)
};

// 전체 주차 공간 조회
export const getAllParkingSpaces = async () => {
    const response = await axios.get(BASE_URL);
    return response.data; // List<ParkingspacesDTO> (JSON 배열)
};

// 위치별 주차 공간 조회
export const getParkingSpacesByLocation = async (location) => {
    const response = await axios.get(`${BASE_URL}/location/${location}`);
    return response.data; // List<ParkingspacesDTO> (JSON 배열)
};

// 주차 공간 정보 수정
export const updateParkingSpace = async (parkingId, parkingSpacesDTO) => {
    const response = await axios.patch(`${BASE_URL}/${parkingId}`, parkingSpacesDTO);
    return response.data; // 수정된 ParkingspacesDTO 객체 (JSON)
};

// 주차 공간 상태 변경
export const updateParkingSpaceStatus = async (parkingId, parkingSpacesStatus) => {
    const response = await axios.patch(`${BASE_URL}/${parkingId}/status`, parkingSpacesStatus);
    return response.data; // 수정된 ParkingspacesDTO 객체 (JSON)
};

// 주차 공간 삭제
export const deleteParkingSpace = async (parkingId) => {
    await axios.delete(`${BASE_URL}/${parkingId}`);
};
