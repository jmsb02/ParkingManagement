import React, { useState } from 'react';
import { signIn } from '../../api/user/UserAPI';

const SignIn = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSignIn = async () => {
        if (credentials.email && credentials.password) {
            try {
                const user = await signIn(credentials);
                setMessage(`Welcome, ${user.username}!`);
            } catch (error) {
                setMessage('Login failed. Please check your credentials and try again.');
            }
        } else {
            setMessage('Email and password are required.');
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleSignIn}>Sign In</button>
            <p>{message}</p>
        </div>
    );
};

export default SignIn;
