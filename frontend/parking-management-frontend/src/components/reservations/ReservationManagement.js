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

    // 예약 목록을 가져오는 함수
    const fetchReservations = useCallback(async () => {
        try {
            const res = await getAllReservations();
            setReservations(res);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }, []);

    useEffect(() => {
        console.log(reservations);
        fetchReservations();
    }, [fetchReservations]);

    const handleCreateReservation = async () => {
        try {
            if (newReservation.username && newReservation.date && newReservation.startTime && newReservation.endTime && newReservation.location) {
                await createReservation(newReservation);
                setNewReservation({
                    username: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    location: ''
                });
                await fetchReservations();  // 예약 생성 후 목록 갱신
            } else {
                alert("모든 필드를 입력해주세요.");  // 유효성 검사
            }
        } catch (error) {
            alert("예약 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleDeleteReservation = async (reservationId) => {
        try {
            await deleteReservation(reservationId);
            await fetchReservations();  // 삭제 후 목록 갱신
        } catch (error) {
            alert("예약 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleSelectReservation = async (reservation) => {
        try {
            console.log("Selected reservation ID: ", reservation.id);  // 추가된 로그
            console.log("Selected reservation: ", reservation); // 예약 전체 정보 확인
            const fetchedReservation = await getReservationById(reservation.id);
            setSelectedReservation(fetchedReservation);
            setUpdatedReservation({
                username: fetchedReservation.username,
                date: fetchedReservation.date,
                startTime: fetchedReservation.startTime,
                endTime: fetchedReservation.endTime,
                location: fetchedReservation.location
            });
        } catch (error) {
            alert("예약 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleUpdateReservation = async () => {
        try {
            if (selectedReservation) {
                // 변경된 필드만 업데이트
                const updatedFields = Object.keys(updatedReservation).reduce((acc, key) => {
                    if (updatedReservation[key] !== selectedReservation[key]) {
                        acc[key] = updatedReservation[key];
                    }
                    return acc;
                }, {});

                await updateReservation(selectedReservation.id, updatedFields);
                setUpdatedReservation({
                    username: '',
                    date: '',
                    startTime: '',
                    endTime: '',
                    location: ''
                });
                setSelectedReservation(null);
                await fetchReservations();  // 업데이트 후 목록 갱신
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
