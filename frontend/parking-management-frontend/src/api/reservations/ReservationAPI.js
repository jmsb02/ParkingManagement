import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/reservations';

export const createReservation = async (reservation) => {
    const response = await axios.post(BASE_URL, { ...reservation, username: reservation.username }); // username으로 전달
    return response.data;
};

// 모든 예약 조회
export const getAllReservations = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// 특정 예약 조회 시 username 사용
export const getReservationById = async (reservationId) => {
    const response = await axios.get(`${BASE_URL}/${reservationId}`);
    return response.data;
};

// 예약 업데이트
export const updateReservation = async (reservationId, reservation) => {
    const response = await axios.patch(`${BASE_URL}/${reservationId}`, { ...reservation, username: reservation.userId });
    return response.data;
};

// 예약 삭제
export const deleteReservation = async (reservationId) => {
    await axios.delete(`${BASE_URL}/${reservationId}`);
};
