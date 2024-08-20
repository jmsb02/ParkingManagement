// parkingSpaceAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/parking-spaces';

export const createParkingSpace = async (parkingSpace) => {
    const response = await axios.post(BASE_URL, parkingSpace);
    return response.data;
};

export const getAllParkingSpaces = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getParkingSpaceById = async (parkingId) => {
    const response = await axios.get(`${BASE_URL}/${parkingId}`);
    return response.data;
};

export const updateParkingSpace = async (parkingId, parkingSpace) => {
    const response = await axios.patch(`${BASE_URL}/${parkingId}`, parkingSpace);
    return response.data;
};

export const changeParkingSpaceStatus = async (parkingId, status) => {
    const response = await axios.patch(`${BASE_URL}/${parkingId}/status`, { status });
    return response.data;
};

export const deleteParkingSpace = async (parkingId) => {
    await axios.delete(`${BASE_URL}/${parkingId}`);
};
