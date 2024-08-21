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

    useEffect(() => {
        const fetchParkingSpaces = async () => {
            const spaces = await getAllParkingSpaces();
            setParkingSpaces(spaces);
        };
        fetchParkingSpaces();
    }, []);

    const handleCreateParkingSpace = async () => {
        if (newParkingSpace.location && newParkingSpace.status) {
            await createParkingSpace(newParkingSpace);
            setNewParkingSpace({ location: '', status: '' });
            const spaces = await getAllParkingSpaces();
            setParkingSpaces(spaces);
        }
    };

    const handleDeleteParkingSpace = async (parkingId) => {
        await deleteParkingSpace(parkingId);
        const spaces = await getAllParkingSpaces();
        setParkingSpaces(spaces);
    };

    const handleSelectParkingSpace = async (parkingId) => {
        const space = await getParkingSpaceById(parkingId);
        setSelectedParkingSpace(space);
        setUpdatedParkingSpace({ location: space.location, status: space.status });
    };

    const handleUpdateParkingSpace = async (parkingId) => {
        if (updatedParkingSpace.location && updatedParkingSpace.status) {
            await updateParkingSpace(parkingId, updatedParkingSpace);
            setUpdatedParkingSpace({ location: '', status: '' });
            setSelectedParkingSpace(null);
            const spaces = await getAllParkingSpaces();
            setParkingSpaces(spaces);
        }
    };

    const handleChangeStatus = async (parkingId, status) => {
        await changeParkingSpaceStatus(parkingId, status);
        const spaces = await getAllParkingSpaces();
        setParkingSpaces(spaces);
    };

    return (
        <div>
            <h2>Parking Space Management</h2>
            <div className="button-container">
                <Link to="/users">
                    <button>Go to User Management</button>
                </Link>
                <Link to="/reservations">
                    <button>Go to Reservations</button>
                </Link>
            </div>

            <div className="input-container">
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
            </div>
            <button className="create-button" onClick={handleCreateParkingSpace}>Create Parking Space</button>

            <h3>Existing Parking Spaces</h3>
            <ul>
                {parkingSpaces.map((space) => (
                    <li key={space.id}>
                        {space.location} - {space.status}
                        <button onClick={() => handleDeleteParkingSpace(space.id)}>Delete</button>
                        <button onClick={() => handleSelectParkingSpace(space.id)}>Edit</button>
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
