// src/components/ParkingSpaceManagement.js
import React, { useEffect, useState } from 'react';
import { getAllParkingSpaces, createParkingSpace, deleteParkingSpace } from '../api/ParkingSpacesAPI';

const ParkingSpaceManagement = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [newParkingSpace, setNewParkingSpace] = useState({
        location: '',
        number: '',
        status: '',
    });

    useEffect(() => {
        // 전체 주차 공간 조회
        getAllParkingSpaces().then(setParkingSpaces);
    }, []);

    const handleCreateParkingSpace = async () => {
        if (newParkingSpace.location && newParkingSpace.number && newParkingSpace.status) {
            await createParkingSpace(newParkingSpace);
            setNewParkingSpace({ location: '', number: '', status: '' });
            getAllParkingSpaces().then(setParkingSpaces); // 주차 공간 목록 갱신
        }
    };

    const handleDeleteParkingSpace = async (parkingId) => {
        await deleteParkingSpace(parkingId);
        getAllParkingSpaces().then(setParkingSpaces); // 주차 공간 목록 갱신
    };

    return (
        <div>
            <h2>Parking Space Management</h2>
            <input
                type="text"
                placeholder="Location"
                value={newParkingSpace.location}
                onChange={(e) => setNewParkingSpace({ ...newParkingSpace, location: e.target.value })}
            />
            <input
                type="text"
                placeholder="Number"
                value={newParkingSpace.number}
                onChange={(e) => setNewParkingSpace({ ...newParkingSpace, number: e.target.value })}
            />
            <input
                type="text"
                placeholder="Status"
                value={newParkingSpace.status}
                onChange={(e) => setNewParkingSpace({ ...newParkingSpace, status: e.target.value })}
            />
            <button onClick={handleCreateParkingSpace}>Create Parking Space</button>

            <ul>
                {parkingSpaces.map((parkingSpace) => (
                    <li key={parkingSpace.id}>
                        Location: {parkingSpace.location}, Number: {parkingSpace.number}, Status: {parkingSpace.status}
                        <button onClick={() => handleDeleteParkingSpace(parkingSpace.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingSpaceManagement;
