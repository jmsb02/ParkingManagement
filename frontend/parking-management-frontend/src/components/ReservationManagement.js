// src/components/ReservationManagement.js
import React, { useEffect, useState } from 'react';
import { getAllReservations, createReservation, deleteReservation } from '../api/ReservationsAPI';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        userId: '',
        parkingSpaceId: '',
        reservationTime: '',
    });

    useEffect(() => {
        // 전체 예약 조회
        getAllReservations().then(setReservations);
    }, []);

    const handleCreateReservation = async () => {
        if (newReservation.userId && newReservation.parkingSpaceId && newReservation.reservationTime) {
            await createReservation(newReservation);
            setNewReservation({ userId: '', parkingSpaceId: '', reservationTime: '' });
            getAllReservations().then(setReservations); // 예약 목록 갱신
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        await deleteReservation(reservationId);
        getAllReservations().then(setReservations); // 예약 목록 갱신
    };

    return (
        <div>
            <h2>Reservation Management</h2>
            <input
                type="text"
                placeholder="User ID"
                value={newReservation.userId}
                onChange={(e) => setNewReservation({ ...newReservation, userId: e.target.value })}
            />
            <input
                type="text"
                placeholder="Parking Space ID"
                value={newReservation.parkingSpaceId}
                onChange={(e) => setNewReservation({ ...newReservation, parkingSpaceId: e.target.value })}
            />
            <input
                type="datetime-local"
                placeholder="Reservation Time"
                value={newReservation.reservationTime}
                onChange={(e) => setNewReservation({ ...newReservation, reservationTime: e.target.value })}
            />
            <button onClick={handleCreateReservation}>Create Reservation</button>

            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        Reservation ID: {reservation.id}, User ID: {reservation.userId}, Parking Space ID: {reservation.parkingSpaceId}
                        <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReservationManagement;
