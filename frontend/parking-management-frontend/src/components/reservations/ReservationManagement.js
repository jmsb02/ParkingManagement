import React, { useState, useEffect } from 'react';
import { getAllReservations, createReservation, updateReservation, deleteReservation } from '../../api/reservations/ReservationAPI';
import './ReservationManagement.css';
import { Link } from 'react-router-dom';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({ userId: '', parkingSpaceId: '', date: '' });
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [updatedReservation, setUpdatedReservation] = useState({ userId: '', parkingSpaceId: '', date: '' });

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await getAllReservations();
            setReservations(res);
        };
        fetchReservations();
    }, []);

    const handleCreateReservation = async () => {
        if (newReservation.userId && newReservation.parkingSpaceId && newReservation.date) {
            await createReservation(newReservation);
            setNewReservation({ userId: '', parkingSpaceId: '', date: '' });
            const res = await getAllReservations();
            setReservations(res);
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        await deleteReservation(reservationId);
        const res = await getAllReservations();
        setReservations(res);
    };

    const handleSelectReservation = (reservation) => {
        setSelectedReservation(reservation);
        setUpdatedReservation({ userId: reservation.userId, parkingSpaceId: reservation.parkingSpaceId, date: reservation.date });
    };

    const handleUpdateReservation = async () => {
        if (selectedReservation) {
            await updateReservation(selectedReservation.id, updatedReservation);
            setUpdatedReservation({ userId: '', parkingSpaceId: '', date: '' });
            setSelectedReservation(null);
            const res = await getAllReservations();
            setReservations(res);
        }
    };

    return (
        <div>
            <h2>Reservation Management</h2>
            <div className="button-container">
                <Link to="/users">
                    <button className="nav-button">Go to User Management</button>
                </Link>
                <Link to="/parking-spaces">
                    <button className="nav-button">Go to Parking Spaces</button>
                </Link>
            </div>
            <div className="reservation-inputs">
                <input
                    type="text"
                    placeholder="User ID"
                    value={newReservation.userId}
                    onChange={(e) => setNewReservation({ ...newReservation, userId: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Parking ID"
                    value={newReservation.parkingSpaceId}
                    onChange={(e) => setNewReservation({ ...newReservation, parkingSpaceId: e.target.value })}
                />
                <input
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                />
                <button onClick={handleCreateReservation} className="create-button">Create Reservation</button>
            </div>

            <h3>Existing Reservations</h3>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        User ID: {reservation.userId}, Parking ID: {reservation.parkingSpaceId}, Date: {reservation.date}
                        <div className="button-group">
                            <button onClick={() => handleSelectReservation(reservation)} className="action-button">Edit</button>
                            <button onClick={() => handleDeleteReservation(reservation.id)} className="action-button">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedReservation && (
                <div>
                    <h3>Edit Reservation</h3>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={updatedReservation.userId}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, userId: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Parking ID"
                        value={updatedReservation.parkingSpaceId}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, parkingSpaceId: e.target.value })}
                    />
                    <input
                        type="date"
                        value={updatedReservation.date}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, date: e.target.value })}
                    />
                    <button onClick={handleUpdateReservation}>Update Reservation</button>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;
