import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { refreshAccessToken } from '../services/LoginService';

const TokenRefresh = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const scheduleTokenRefresh = () => {
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            if (tokenExpiration) {
                const timeout = parseInt(tokenExpiration, 10) - Date.now() - 5000; 

                if (timeout > 0) {
                    setTimeout(async () => {
                        try {
                            await refreshAccessToken();
                            scheduleTokenRefresh(); 
                        } catch {
                            alert('Session expired. Please login again.');
                            localStorage.clear();
                            navigate('/login');
                        }
                    }, timeout);
                }
            }
        };

        scheduleTokenRefresh();
    }, [navigate]);

    return null;
};

export default TokenRefresh;
