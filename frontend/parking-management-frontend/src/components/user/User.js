import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, getUserById, updateUser } from '../../api/user/UserAPI';

const User = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // 선택한 사용자
    const [updatedUser, setUpdatedUser] = useState({}); // 업데이트할 사용자 정보

    useEffect(() => {
        getAllUsers().then(setUsers);
    }, []);

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        getAllUsers().then(setUsers);
    };

    const handleEditUser = async (userId) => {
        const user = await getUserById(userId);
        setSelectedUser(user);
        setUpdatedUser({ username: user.username, email: user.email }); // 초기값 설정
    };

    const handleUpdateUser = async () => {
        if (selectedUser) {
            await updateUser(selectedUser.id, updatedUser);
            setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...updatedUser } : user)));
            setSelectedUser(null); // 선택 초기화
            setUpdatedUser({}); // 입력 필드 초기화
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
                        value={updatedUser.username || ''}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={updatedUser.email || ''}
                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                    />
                    <button onClick={handleUpdateUser}>Update User</button>
                </div>
            )}
        </div>
    );
};

export default User;
