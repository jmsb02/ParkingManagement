import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/reservations';

// 예약 생성
// 예약 생성
export const createReservation = async (reservation) => {
    try {
        const response = await axios.post(BASE_URL, reservation);
        return response.data;
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw error;
    }
};

// 모든 예약 조회
export const getAllReservations = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

// 특정 예약 조회
export const getReservationById = async (reservationId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${reservationId}`);
        return response.data;
    }catch (error) {
        console.error('예약 조회 실패:', error);
        throw error;
    }
};

// 예약 업데이트
export const updateReservation = async (reservationId, reservation) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${reservationId}`, reservation);
        return response.data;
    } catch (error) {
        console.error("Error updating reservation:", error);
        throw error;
    }
};

// 예약 삭제
export const deleteReservation = async (reservationId) => {
    await axios.delete(`${BASE_URL}/${reservationId}`);
};
