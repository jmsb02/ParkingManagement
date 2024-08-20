import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './components/user/User'; // User.js로 경로 수정
import ParkingSpace from './components/parking/ParkingSpace'; // 경로에 문제 없음
import ReservationManagement from './components/reservations/ReservationManagement'; // 경로에 문제 없음


function App() {
    return (
        <Router>
            <div className="App">
                <h1>Parking Management System</h1>
                <Routes>
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/parking-spaces" element={<ParkingSpace />} />
                    <Route path="/reservations" element={<ReservationManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
