import React, { useEffect, useState } from 'react';
import { getAllParkingSpaces, createParkingSpace, deleteParkingSpace, getParkingSpaceById, updateParkingSpace, changeParkingSpaceStatus } from '../../api/parking/ParkingSpaceAPI';

const ParkingSpaces = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [newParkingSpace, setNewParkingSpace] = useState({ location: '', status: '' });
    const [selectedParkingSpace, setSelectedParkingSpace] = useState(null); // 선택한 주차 공간
    const [updatedParkingSpace, setUpdatedParkingSpace] = useState({ location: '', status: '' }); // 업데이트할 주차 공간

    useEffect(() => {
        // 전체 주차 공간 조회
        getAllParkingSpaces().then(setParkingSpaces);
    }, []);

    const handleCreateParkingSpace = async () => {
        if (newParkingSpace.location && newParkingSpace.status) {
            await createParkingSpace(newParkingSpace);
            setNewParkingSpace({ location: '', status: '' });
            getAllParkingSpaces().then(setParkingSpaces); // 주차 공간 목록 갱신
        }
    };

    const handleDeleteParkingSpace = async (parkingId) => {
        await deleteParkingSpace(parkingId);
        getAllParkingSpaces().then(setParkingSpaces); // 주차 공간 목록 갱신
    };

    const handleUpdateParkingSpace = async (parkingId) => {
        if (updatedParkingSpace.location && updatedParkingSpace.status) {
            await updateParkingSpace(parkingId, updatedParkingSpace);
            setUpdatedParkingSpace({ location: '', status: '' });
            setSelectedParkingSpace(null);
            getAllParkingSpaces().then(setParkingSpaces); // 주차 공간 목록 갱신
        }
    };

    const handleChangeStatus = async (parkingId, status) => {
        await changeParkingSpaceStatus(parkingId, status);
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
                placeholder="Status"
                value={newParkingSpace.status}
                onChange={(e) => setNewParkingSpace({ ...newParkingSpace, status: e.target.value })}
            />
            <button onClick={handleCreateParkingSpace}>Create Parking Space</button>

            <h3>Existing Parking Spaces</h3>
            <ul>
                {parkingSpaces.map((space) => (
                    <li key={space.id}>
                        {space.location} - {space.status}
                        <button onClick={() => handleDeleteParkingSpace(space.id)}>Delete</button>
                        <button onClick={() => setSelectedParkingSpace(space)}>Edit</button>
                        <button onClick={() => handleChangeStatus(space.id, space.status === 'active' ? 'inactive' : 'active')}>
                            Change Status
                        </button>
                    </li>
                ))}
            </ul>

            {selectedParkingSpace && (
                <div>
                    <h3>Edit Parking Space</h3>
                    <input
                        type="text"
                        placeholder="Location"
                        value={updatedParkingSpace.location}
                        onChange={(e) => setUpdatedParkingSpace({ ...updatedParkingSpace, location: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        value={updatedParkingSpace.status}
                        onChange={(e) => setUpdatedParkingSpace({ ...updatedParkingSpace, status: e.target.value })}
                    />
                    <button onClick={() => handleUpdateParkingSpace(selectedParkingSpace.id)}>Update Parking Space</button>
                </div>
            )}
        </div>
    );
};

export default ParkingSpaces;
