import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, getUserById, updateUser, additionalInformation } from '../../api/user/UserAPI';
import './User.css';
import { Link } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ username: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            setMessage('User deleted successfully.');
        } catch (error) {
            console.error("Error deleting user:", error);
            setMessage('Error deleting user.');
        }
    };

    const handleEditUser = async (userId) => {
        try {
            const user = await getUserById(userId);
            setSelectedUser(user);
            setUpdatedUser({ username: user.username, email: user.email });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleUpdateUser = async () => {
        if (selectedUser) {
            try {
                await updateUser(selectedUser.id, updatedUser);
                setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)));
                setMessage('User updated successfully.');
            } catch (error) {
                console.error("Error updating user:", error);
                setMessage('Error updating user.');
            } finally {
                setSelectedUser(null);
                setUpdatedUser({ username: '', email: '' });
            }
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <div className="button-container">
                <Link to="/parking-spaces">
                    <button>Go to Parking Spaces</button>
                </Link>
                <Link to="/reservations">
                    <button>Go to Reservations</button>
                </Link>
            </div>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.username} ({user.email})
                            <div>
                                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {message && <p className="message">{message}</p>}

            {selectedUser && (
                <div className="edit-container">
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        placeholder="Username"
                        value={updatedUser.username}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={updatedUser.email}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    />
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}

            {/* 추가 정보 표시 */}
            <div className="empty-space" dangerouslySetInnerHTML={{ __html: additionalInformation }} />
        </div>
    );
};

export default User;
