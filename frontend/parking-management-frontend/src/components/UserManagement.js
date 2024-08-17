import React, { useEffect, useState } from 'react';
import { getAllUsers, signUp, deleteUser } from '../api/UserAPI';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        // 전체 사용자 조회
        getAllUsers().then(setUsers);
    }, []);

    const handleSignUp = async () => {
        if (newUser.username && newUser.email && newUser.password) {
            try {
                await signUp(newUser);
                setMessage('User signed up successfully!');
                setNewUser({ username: '', email: '', password: '' });
                getAllUsers().then(setUsers); // 사용자 목록 갱신
            } catch (error) {
                setMessage('Failed to sign up. Please try again.');
            }
        } else {
            setMessage('All fields are required.');
        }
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        getAllUsers().then(setUsers); // 사용자 목록 갱신
    };

    return (
        <div>
            <h2>User Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button onClick={handleSignUp}>Sign Up</button>
                <p>{message}</p>
            </div>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} ({user.email})
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
