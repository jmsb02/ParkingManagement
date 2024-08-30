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
    const [newParkingSpace, setNewParkingSpace] = useState({ location: '', username: '' });
    const [selectedParkingSpace, setSelectedParkingSpace] = useState(null);
    const [updatedParkingSpace, setUpdatedParkingSpace] = useState({ location: '' });

    const fetchParkingSpaces = async () => {
        try {
            const spaces = await getAllParkingSpaces();
            setParkingSpaces(spaces);
        } catch (error) {
            alert('주차 공간을 가져오는 데 실패했습니다: ' + error);
        }
    };

    useEffect(() => {
        fetchParkingSpaces();
    }, []);

    const handleCreateParkingSpace = async () => {
        if (newParkingSpace.location && newParkingSpace.username) {
            try {
                await createParkingSpace(newParkingSpace);
                setNewParkingSpace({ location: '', username: '' });
                fetchParkingSpaces();
            } catch (error) {
                alert('주차 공간 생성에 실패했습니다: ' + error);
            }
        }
    };

    const handleDeleteParkingSpace = async (parkingId) => {
        try {
            await deleteParkingSpace(parkingId);
            fetchParkingSpaces();
        } catch (error) {
            alert('주차 공간 삭제에 실패했습니다: ' + error);
        }
    };

    const handleSelectParkingSpace = async (parkingId) => {
        try {
            const space = await getParkingSpaceById(parkingId);
            setSelectedParkingSpace(space);
            setUpdatedParkingSpace({ location: space.location });
        } catch (error) {
            alert('주차 공간을 가져오는 데 실패했습니다: ' + error);
        }
    };

    const handleUpdateParkingSpace = async (parkingId) => {
        if (updatedParkingSpace.location) {
            try {
                await updateParkingSpace(parkingId, updatedParkingSpace);
                setUpdatedParkingSpace({ location: '' });
                setSelectedParkingSpace(null);
                fetchParkingSpaces();
            } catch (error) {
                alert('주차 공간 업데이트에 실패했습니다: ' + error);
            }
        }
    };

    const handleChangeStatus = async (parkingId, status) => {
        try {
            await changeParkingSpaceStatus(parkingId, { status });
            fetchParkingSpaces();
        } catch (error) {
            alert('주차 공간 상태 변경에 실패했습니다: ' + error);
        }
    };

    return (
        <div>
            <h2>주차 공간 관리</h2>
            <div className="button-container">
                <Link to="/users">
                    <button>사용자 관리로 이동</button>
                </Link>
                <Link to="/reservations">
                    <button>주차 공간 예약으로 이동</button>
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
            <button className="create-button" onClick={handleCreateParkingSpace}>주차 공간 생성</button>

            <h3>기존 주차 공간</h3>
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
                    <button onClick={() => handleUpdateParkingSpace(selectedParkingSpace.id)}>주차 공간 업데이트</button>
                </div>
            )}
        </div>
    );
};

export default ParkingSpaces;