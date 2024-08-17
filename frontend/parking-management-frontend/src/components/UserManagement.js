// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, signUp, deleteUser } from '../api/UserAPI';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '' });

    useEffect(() => {
        // 전체 사용자 조회
        getAllUsers().then(setUsers);
    }, []);

    const handleSignUp = async () => {
        if (newUser.username && newUser.password) {
            await signUp(newUser);
            setNewUser({ username: '', password: '' });
            getAllUsers().then(setUsers); // 사용자 목록 갱신
        }
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        getAllUsers().then(setUsers); // 사용자 목록 갱신
    };

    return (
        <div>
            <h2>User Management</h2>
            <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleSignUp}>Sign Up</button>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username}
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
