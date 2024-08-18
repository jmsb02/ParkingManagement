import React, { useEffect, useState } from 'react';
import { getAllUsers } from 'frontend/parking-management-frontend/src/api/user/UserAPI'; // 경로 수정

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('사용자 목록을 가져오는 데 실패했습니다.');
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>사용자 목록</h2>
            {error && <p>{error}</p>} {/* 오류 메시지 표시 */}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li> // user 객체의 구조에 맞게 수정
                ))}
            </ul>
        </div>
    );
};

export default UserList;
