import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './components/user/User'; // User.js로 경로 수정
import ParkingSpace from './components/parking/ParkingSpace'; // 경로에 문제 없음
import ReservationManagement from './components/reservations/ReservationManagement'; // 경로에 문제 없음
import SignUp from './components/user/SignUp';
import SignIn from "./components/user/SignIn"; // 경로를 확인하세요.

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Parking Management System</h1>
                <Routes>
                    <Route path="/" element={<SignUp/>} />
                    <Route path="/login" element={<SignIn/>} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/parking-spaces" element={<ParkingSpace />} />
                    <Route path="/reservations" element={<ReservationManagement />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
