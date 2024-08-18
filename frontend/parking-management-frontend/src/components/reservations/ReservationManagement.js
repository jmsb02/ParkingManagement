import React, { useState, useEffect } from 'react';
import { getAllReservations, createReservation, getReservationById, updateReservation, deleteReservation } from '../../api/reservations/ReservationAPI';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({}); // 새 예약 정보
    const [selectedReservation, setSelectedReservation] = useState(null); // 선택된 예약
    const [updatedReservation, setUpdatedReservation] = useState({}); // 업데이트할 예약 정보

    useEffect(() => {
        async function fetchReservations() {
            const data = await getAllReservations();
            setReservations(data);
        }
        fetchReservations();
    }, []);

    const handleCreateReservation = async () => {
        try {
            const reservationId = await createReservation(newReservation);
            setReservations([...reservations, { id: reservationId, ...newReservation }]);
            setNewReservation({}); // 입력 필드 초기화
        } catch (error) {
            console.error("Failed to create reservation:", error);
        }
    };

    const handleUpdateReservation = async (reservationId) => {
        try {
            await updateReservation(reservationId, updatedReservation);
            setReservations(reservations.map(reservation =>
                reservation.id === reservationId ? { ...reservation, ...updatedReservation } : reservation
            ));
            setSelectedReservation(null); // 선택 초기화
            setUpdatedReservation({}); // 입력 필드 초기화
        } catch (error) {
            console.error("Failed to update reservation:", error);
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        try {
            await deleteReservation(reservationId);
            setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        } catch (error) {
            console.error("Failed to delete reservation:", error);
        }
    };

    return (
        <div>
            <h2>Reservations</h2>
            <div>
                <h3>Create Reservation</h3>
                {/* 예약 생성 폼 */}
                <input
                    type="text"
                    placeholder="Reservation Details"
                    value={newReservation.details || ''}
                    onChange={(e) => setNewReservation({ ...newReservation, details: e.target.value })}
                />
                <button onClick={handleCreateReservation}>Create Reservation</button>
            </div>

            <h3>Existing Reservations</h3>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        {reservation.details}
                        <button onClick={() => setSelectedReservation(reservation)}>Edit</button>
                        <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {selectedReservation && (
                <div>
                    <h3>Edit Reservation</h3>
                    <input
                        type="text"
                        placeholder="Update Reservation Details"
                        value={updatedReservation.details || selectedReservation.details}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, details: e.target.value })}
                    />
                    <button onClick={() => handleUpdateReservation(selectedReservation.id)}>Update Reservation</button>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;
