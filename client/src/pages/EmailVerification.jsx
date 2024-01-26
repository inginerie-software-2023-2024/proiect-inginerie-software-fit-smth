import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const fetchData = async () => {
            console.log(token);
            try {
                const response = await axios.post('http://localhost:3001/auth/verify-mail', { token });
                if (response.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    console.log(response.data.err);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchData();
        } else {
            console.error('Token not found in the URL');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Email Verification</h1>
        </div>
    );
};

export default EmailVerification;
