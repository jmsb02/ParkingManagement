// ReservationsAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/reservations';

// 예약 생성
export const createReservation = async (reservationsDTO) => {
    const response = await axios.post(BASE_URL, reservationsDTO);
    return response.data; // 예약 ID (Long)
};

// 특정 예약 조회
export const getReservationById = async (reservationId) => {
    const response = await axios.get(`${BASE_URL}/${reservationId}`);
    return response.data; // ReservationsDTO 객체 (JSON)
};

// 전체 예약 조회
export const getAllReservations = async () => {
    const response = await axios.get(BASE_URL);
    return response.data; // List<ReservationsDTO> (JSON 배열)
};

// 예약 정보 수정
export const updateReservation = async (reservationId, reservationsDTO) => {
    const response = await axios.patch(`${BASE_URL}/${reservationId}`, reservationsDTO);
    return response.data; // 수정된 ReservationsDTO 객체 (JSON)
};

// 예약 삭제
export const deleteReservation = async (reservationId) => {
    await axios.delete(`${BASE_URL}/${reservationId}`);
};
