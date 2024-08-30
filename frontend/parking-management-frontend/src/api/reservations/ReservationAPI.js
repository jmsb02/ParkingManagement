import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api/reservations';

// 예약 생성
export const createReservation = async (reservationData) => {
    try {
        const response = await axios.post(BASE_URL, reservationData);
        return response.data; // 예약 ID 반환
    } catch (error) {
        console.error('예약 생성 실패:', error);
        throw error;
    }
};

// 예약 조회 (ID로)
export const getReservationById = async (reservationId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${reservationId}`);
        return response.data; // ReservationsDTO 반환
    } catch (error) {
        console.error('예약 조회 실패:', error);
        throw error;
    }
};

// 모든 예약 조회
export const getAllReservations = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data; // ReservationsDTO 리스트 반환
    } catch (error) {
        console.error('모든 예약 조회 실패:', error);
        throw error;
    }
};

// 예약 수정
export const updateReservation = async (reservationId, updateData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${reservationId}`, updateData);
        return response.data; // 수정된 예약 정보 반환
    } catch (error) {
        console.error('예약 수정 실패:', error);
        throw error;
    }
};

// 예약 삭제
export const deleteReservation = async (reservationId) => {
    try {
        await axios.delete(`${BASE_URL}/${reservationId}`);
        return; // 아무것도 반환하지 않음
    } catch (error) {
        console.error('예약 삭제 실패:', error);
        throw error;
    }
};
