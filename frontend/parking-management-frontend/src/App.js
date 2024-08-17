import React from 'react';
import UserManagement from './components/UserManagement';
import ReservationManagement from './components/ReservationManagement';
import ParkingSpaceManagement from './components/ParkingSpaceManagement';

function App() {
    return (
        <div className="App">
            <h1>Parking Management System</h1>
            <UserManagement />
            <ReservationManagement />
            <ParkingSpaceManagement />
        </div>
    );
}

export default App;
