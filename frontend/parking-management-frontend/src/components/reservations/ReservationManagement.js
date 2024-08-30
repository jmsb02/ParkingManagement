import React, { useState, useEffect, useCallback } from 'react';
import { getAllReservations, createReservation, updateReservation, deleteReservation, getReservationById } from '../../api/reservations/ReservationAPI';
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

    const fetchReservations = useCallback(async () => {
        try {
            const res = await getAllReservations();
            setReservations(res);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }, []);

    useEffect(() => {
        fetchReservations();
    }, [fetchReservations]);

    const handleCreateReservation = async () => {
        try {
            if (Object.values(newReservation).every(field => field)) {
                await createReservation(newReservation);
                setNewReservation({
                    username: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    location: ''
                });
                await fetchReservations();
            } else {
                alert("모든 필드를 입력해주세요.");
            }
        } catch (error) {
            alert("예약 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        try {
            await deleteReservation(reservationId);
            await fetchReservations();
        } catch (error) {
            alert("예약 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleSelectReservation = async (reservation) => {
        try {
            const fetchedReservation = await getReservationById(reservation.id);
            console.log(reservation.id);
            setSelectedReservation(fetchedReservation);
            setUpdatedReservation(fetchedReservation);
        } catch (error) {
            alert("예약 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleUpdateReservation = async () => {
        try {
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
                await fetchReservations();
            }
        } catch (error) {
            alert("예약 업데이트에 실패했습니다. 다시 시도해주세요.");
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
                    onChange={(e) => setNewReservation({...newReservation, username: e.target.value})}
                />
                <input
                    type="date"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                />
                <input
                    type="time"
                    value={newReservation.startTime}
                    onChange={(e) => setNewReservation({...newReservation, startTime: e.target.value})}
                />
                <input
                    type="time"
                    value={newReservation.endTime}
                    onChange={(e) => setNewReservation({...newReservation, endTime: e.target.value})}
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
                        회원이름: {reservation.username}, 예약 날짜: {reservation.date}, 시작 시간: {reservation.startTime},
                        종료 시간: {reservation.endTime}, 주차 공간: {reservation.location}
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
                        onChange={(e) => setUpdatedReservation({...updatedReservation, username: e.target.value})}
                    />
                    <input
                        type="date"
                        value={updatedReservation.date}
                        onChange={(e) => setUpdatedReservation({...updatedReservation, date: e.target.value})}
                    />
                    <input
                        type="time"
                        value={updatedReservation.startTime}
                        onChange={(e) => setUpdatedReservation({...updatedReservation, startTime: e.target.value})}
                    />
                    <input
                        type="time"
                        value={updatedReservation.endTime}
                        onChange={(e) => setUpdatedReservation({...updatedReservation, endTime: e.target.value})}
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
