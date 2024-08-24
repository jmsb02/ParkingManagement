import React, { useState, useEffect } from 'react';
import { getAllReservations, createReservation, updateReservation, deleteReservation } from '../../api/reservations/ReservationAPI';
import './ReservationManagement.css';
import { Link } from 'react-router-dom';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [newReservation, setNewReservation] = useState({
        username: '',
        date: '',
        startTime: '',
        endTime: '',
        location: ''
    });
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [updatedReservation, setUpdatedReservation] = useState({
        username: '',
        date: '',
        startTime: '',
        endTime: '',
        location: ''
    });

    useEffect(() => {
        const fetchReservations = async () => {
            const res = await getAllReservations();
            setReservations(res);
        };
        fetchReservations();
    }, []);

    const handleCreateReservation = async () => {
        if (newReservation.username && newReservation.date && newReservation.startTime && newReservation.endTime && newReservation.location) {
            await createReservation(newReservation);
            setNewReservation({
                username: '',
                date: '',
                startTime: '',
                endTime: '',
                location: ''
            });
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
        setUpdatedReservation({
            username: reservation.username,
            date: reservation.date,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            location: reservation.location
        });
    };

    const handleUpdateReservation = async () => {
        if (selectedReservation) {
            await updateReservation(selectedReservation.id, updatedReservation);
            setUpdatedReservation({
                username: '',
                date: '',
                startTime: '',
                endTime: '',
                location: ''
            });
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
                    placeholder="회원이름"
                    value={newReservation.username}
                    onChange={(e) => setNewReservation({ ...newReservation, username: e.target.value })}
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
                <input
                    type="text"
                    placeholder="주차 공간"
                    value={newReservation.location}
                    onChange={(e) => setNewReservation({
                        ...newReservation,
                        location: e.target.value
                    })}
                />
                <button onClick={handleCreateReservation} className="create-button">Create Reservation</button>
            </div>

            <h3>Existing Reservations</h3>
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>
                        회원이름: {reservation.username}, 예약 날짜: {reservation.date}, 시작 시간: {reservation.startTime}, 종료 시간: {reservation.endTime}, 주차 공간: {reservation.location}
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
                        placeholder="Username"
                        value={updatedReservation.username}
                        onChange={(e) => setUpdatedReservation({ ...updatedReservation, username: e.target.value })}
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
                    <input
                        type="text"
                        placeholder="Parking Space Location"
                        value={updatedReservation.location}
                        onChange={(e) => setUpdatedReservation({
                            ...updatedReservation,
                            location: e.target.value
                        })}
                    />
                    <button onClick={handleUpdateReservation}>Update Reservation</button>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;
