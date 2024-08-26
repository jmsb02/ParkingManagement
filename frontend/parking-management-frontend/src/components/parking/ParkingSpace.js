import React, { useEffect, useState } from 'react';
import {
    getAllParkingSpaces,
    createParkingSpace,
    deleteParkingSpace,
    updateParkingSpace,
    changeParkingSpaceStatus,
    getParkingSpaceById
} from '../../api/parking/ParkingSpaceAPI';
import './ParkingSpaces.css';
import { Link } from 'react-router-dom';

const ParkingSpaces = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [newParkingSpace, setNewParkingSpace] = useState({ location: '', status: '' });
    const [selectedParkingSpace, setSelectedParkingSpace] = useState(null);
    const [updatedParkingSpace, setUpdatedParkingSpace] = useState({ location: '', status: '' });

    // 주차 공간 목록을 불러오는 함수
    const fetchParkingSpaces = async () => {
        try {
            const spaces = await getAllParkingSpaces();
            setParkingSpaces(spaces);
        } catch (error) {
            console.error('Failed to fetch parking spaces:', error);
        }
    };

    useEffect(() => {
        fetchParkingSpaces();
    }, []);

    const handleCreateParkingSpace = async () => {
        if (newParkingSpace.location && newParkingSpace.status) {
            try {
                await createParkingSpace(newParkingSpace);
                setNewParkingSpace({ location: '', status: '' });
                fetchParkingSpaces();
            } catch (error) {
                console.error('Failed to create parking space:', error);
            }
        }
    };

    const handleDeleteParkingSpace = async (parkingId) => {
        try {
            await deleteParkingSpace(parkingId);
            fetchParkingSpaces();
        } catch (error) {
            console.error('Failed to delete parking space:', error);
        }
    };

    const handleSelectParkingSpace = async (parkingId) => {
        try {
            const space = await getParkingSpaceById(parkingId);
            setSelectedParkingSpace(space);
            setUpdatedParkingSpace({ location: space.location, status: space.status });
        } catch (error) {
            console.error('Failed to fetch parking space:', error);
        }
    };

    const handleUpdateParkingSpace = async (parkingId) => {
        if (updatedParkingSpace.location && updatedParkingSpace.status) {
            try {
                await updateParkingSpace(parkingId, updatedParkingSpace);
                setUpdatedParkingSpace({ location: '', status: '' });
                setSelectedParkingSpace(null);
                fetchParkingSpaces();
            } catch (error) {
                console.error('Failed to update parking space:', error);
            }
        }
    };

    const handleChangeStatus = async (parkingId, status) => {
        try {
            await changeParkingSpaceStatus(parkingId, { status });
            fetchParkingSpaces();
        } catch (error) {
            console.error('Failed to change parking space status:', error);
        }
    };

    return (
        <div>
            <h2>Parking space management</h2>
            <div className="button-container">
                <Link to="/users">
                    <button>Go to User Management</button>
                </Link>
                <Link to="/reservations">
                    <button>Go to Parking Spaces</button>
                </Link>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="사용자 이름"
                    value={newParkingSpace.username}
                    onChange={(e) => setNewParkingSpace({...newParkingSpace, username: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="위치"
                    value={newParkingSpace.location}
                    onChange={(e) => setNewParkingSpace({...newParkingSpace, location: e.target.value})}
                />
            </div>
            <button className="create-button" onClick={handleCreateParkingSpace}>Create Parking Spaces</button>

            <h3>Existing Parking Spaces</h3>
            <ul>
                {parkingSpaces.map((space) => (
                    <li key={space.id}>
                        {space.location} - {space.status}
                        <button onClick={() => handleSelectParkingSpace(space.id)}>편집</button>
                        <button
                            onClick={() => handleChangeStatus(space.id, space.status === 'active' ? 'inactive' : 'active')}>
                            상태 변경
                        </button>
                        <button onClick={() => handleDeleteParkingSpace(space.id)}>삭제</button>
                    </li>
                ))}
            </ul>

            {selectedParkingSpace && (
                <div>
                    <h3>주차 공간 편집</h3>
                    <input
                        type="text"
                        placeholder="위치"
                        value={updatedParkingSpace.location}
                        onChange={(e) => setUpdatedParkingSpace({...updatedParkingSpace, location: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="상태"
                        value={updatedParkingSpace.status}
                        onChange={(e) => setUpdatedParkingSpace({...updatedParkingSpace, status: e.target.value})}
                    />
                    <button onClick={() => handleUpdateParkingSpace(selectedParkingSpace.id)}>주차 공간 업데이트</button>
                </div>
            )}
        </div>
    );
};

export default ParkingSpaces;
