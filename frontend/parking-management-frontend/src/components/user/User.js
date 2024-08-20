import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, getUserById, updateUser } from '../../api/user/UserAPI';

const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({ username: '', email: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
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
                setSelectedUser(null);
                setUpdatedUser({ username: '', email: '' });
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    return (
        <div>
            <h2>User Management</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} ({user.email})
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {selectedUser && (
                <div>
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
        </div>
    );
};

export default User;
