import axios from 'axios';

/**
 * Function to handle login and get the token
 * @param {Object} values - The login credentials
 * @returns {Promise<Object>} - The response data containing the token and user details
 * @throws Will throw an error if the request fails
 */
export const login= async (values) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/token`,
            new URLSearchParams({
                grant_type: 'password',
                client_id: 'XXXDDDDDDFGSDFGDFGSD7',
                user_type: 'B',
                username: values.username,
                password: values.password,
            }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Function to refresh the access token using the refresh_token
 * @returns {Promise<string>} - The new access token
 * @throws Will throw an error if the refresh fails
 */
export const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/token`,
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: 'XXXDDDDDDFGSDFGDFGSD7',
            }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        const { access_token, expires_in } = response.data;
        const expirationTime = Date.now() + expires_in * 1000;

        localStorage.setItem('token', access_token);
        localStorage.setItem('tokenExpiration', expirationTime);

        return access_token;
    } catch (error) {
        throw new Error('Failed to refresh token');
    }
};
