import React, { useState, useEffect } from 'react';
import { getAllReservations, createReservation, updateReservation, deleteReservation } from '../../api/reservations/ReservationAPI';
import './ReservationManagement.css';
import { Link } from 'react-router-dom';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({ username: '', date: '', startTime: '', endTime: '' });
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [updatedReservation, setUpdatedReservation] = useState({ username: '', date: '', startTime: '', endTime: '' });

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await getAllReservations();
            setReservations(res);
        };
        fetchReservations();
    }, []);

    const handleCreateReservation = async () => {
        if (newReservation.username && newReservation.date && newReservation.startTime && newReservation.endTime) {
            await createReservation(newReservation);
            setNewReservation({ username: '', date: '', startTime: '', endTime: '' });
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
        setUpdatedReservation({ username: reservation.username, date: reservation.date, startTime: reservation.startTime, endTime: reservation.endTime });
    };

    const handleUpdateReservation = async () => {
        if (selectedReservation) {
            await updateReservation(selectedReservation.id, updatedReservation);
            setUpdatedReservation({ username: '', date: '', startTime: '', endTime: '' });
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
                    placeholder="Username" // 변경된 부분
                    value={newReservation.username} // 변경된 부분
                    onChange={(e) => setNewReservation({ ...newReservation, username: e.target.value })} // 변경된 부분
                />
                <input
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                />
                <input
                    type="time"
                    value={newReservation.startTime}
                    onChange={(e) => setNewReservation({ ...newReservation, startTime: e.target.value })}
                />
                <input
                    type="time"
                    value={newReservation.endTime}
                    onChange={(e) => setNewReservation({ ...newReservation, endTime: e.target.value })}
                />
                <button onClick={handleCreateReservation} className="create-button">Create Reservation</button>
            </div>

            <h3>Existing Reservations</h3>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        Username: {reservation.username}, Date: {reservation.date}, Start Time: {reservation.startTime}, End Time: {reservation.endTime} {/* 변경된 부분 */}
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
                        placeholder="Username" // 변경된 부분
                        value={updatedReservation.username} // 변경된 부분
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, username: e.target.value })} // 변경된 부분
                    />
                    <input
                        type="date"
                        value={updatedReservation.date}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, date: e.target.value })}
                    />
                    <input
                        type="time"
                        value={updatedReservation.startTime}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, startTime: e.target.value })}
                    />
                    <input
                        type="time"
                        value={updatedReservation.endTime}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, endTime: e.target.value })}
                    />
                    <button onClick={handleUpdateReservation}>Update Reservation</button>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;
