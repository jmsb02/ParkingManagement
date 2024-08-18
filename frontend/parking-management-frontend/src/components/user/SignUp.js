import React, { useState } from 'react';
import { signUp } from '../../api/user/UserAPI';

const SignUp = () => {
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleSignUp = async () => {
        if (newUser.username && newUser.email && newUser.password) {
            try {
                await signUp(newUser);
                setMessage('User signed up successfully!');
                setNewUser({ username: '', email: '', password: '' });
            } catch (error) {
                setMessage('Failed to sign up. Please try again.');
            }
        } else {
            setMessage('All fields are required.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
    );
};

export default SignUp;
