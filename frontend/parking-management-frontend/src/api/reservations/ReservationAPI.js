import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/reservations';

export const createReservation = async (reservation) => {
    const response = await axios.post(BASE_URL, {
        userId: reservation.userId,
        parkingSpaceId: reservation.parkingSpaceId, // 변경된 이름
        date: reservation.date
    });
    return response.data;
};

export const getAllReservations = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getReservationById = async (reservationId) => {
    const response = await axios.get(`${BASE_URL}/${reservationId}`);
    return response.data;
};

export const updateReservation = async (reservationId, reservation) => {
    const response = await axios.patch(`${BASE_URL}/${reservationId}`, reservation);
    return response.data;
};

export const deleteReservation = async (reservationId) => {
    await axios.delete(`${BASE_URL}/${reservationId}`);
};
