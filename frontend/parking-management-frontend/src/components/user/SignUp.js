import React, { useState } from 'react';
import { signUp } from '../../api/user/UserAPI';
import './User.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const validateUser = (user) => {
        const { username, email, password } = user;
        if (!username || !email || !password) {
            return '모든 필드는 필수입니다.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return '유효한 이메일을 입력해주세요.';
        }
        if (password.length < 6) {
            return '비밀번호는 최소 6자 이상이어야 합니다.';
        }
        return null; // 유효할 경우 null 반환
    };

    const handleSignUp = async () => {
        const validationMessage = validateUser(newUser);
        if (validationMessage) {
            setMessage(validationMessage);
            return; // 유효성 검사를 통과하지 못하면 함수 종료
        }

        try {
            await signUp(newUser);
            setMessage('회원가입에 성공했습니다!');
            setNewUser({ username: '', email: '', password: '' });
        } catch (error) {
            setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <input
                type="text"
                placeholder="사용자 이름"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="이메일"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleSignUp}>회원가입</button>
            <p>{message}</p>
            <p>
                이미 계정이 있으신가요?
                <Link to="/login">
                    <button style={{ marginLeft: '5px' }}>로그인</button>
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
