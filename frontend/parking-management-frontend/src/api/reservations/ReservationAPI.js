const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/reservations';

const createReservation = async (reservation) => {
    const response = await axios.post(BASE_URL, reservation);
    return response.data;
};

const getAllReservations = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

const getReservationById = async (reservationId) => {
    const response = await axios.get(`${BASE_URL}/${reservationId}`);
    return response.data;
};

const updateReservation = async (reservationId, reservation) => {
    const response = await axios.patch(`${BASE_URL}/${reservationId}`, reservation);
    return response.data;
};

const deleteReservation = async (reservationId) => {
    await axios.delete(`${BASE_URL}/${reservationId}`);
};

// 모듈 내보내기
module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
};
