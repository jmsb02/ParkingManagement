import React, { useState } from 'react';
import { signIn } from '../../api/user/UserAPI';
import './User.css';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate로 수정

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 추가

    const handleSignIn = async () => {
        if (credentials.email && credentials.password) {
            try {
                const user = await signIn(credentials);
                setMessage(`Welcome, ${user.username}!`);
                navigate('/users'); // 로그인 성공 시 /users로 리다이렉트
            } catch (error) {
                setMessage('로그인에 실패했습니다. 자격 증명을 확인하고 다시 시도해주세요.');
            }
        } else {
            setMessage('이메일과 비밀번호는 필수입니다.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <h3>이메일과 비밀번호를 입력해주세요.</h3>
            <input
                type="email"
                placeholder="이메일"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleSignIn}>로그인</button>
            <p>{message}</p>
            <p>
                계정이 없으신가요?
                <Link to="/signup">
                    <button style={{ marginLeft: '5px' }}>회원가입</button>
                </Link>
            </p>
        </div>
    );
};

export default SignIn;
