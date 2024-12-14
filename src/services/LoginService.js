// src/services/loginService.js
import axios from 'axios';

/**
 * Function to handle login and get the token
 * @param {Object} values - The login credentials
 * @returns {Promise<Object>} - The response data containing the token and user details
 * @throws Will throw an error if the request fails
 */
export const login = async (values) => {
    try {
        // Make the login request
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/token`,
            new URLSearchParams({
                grant_type: "password",
                client_id: "XXXDDDDDDFGSDFGDFGSD7",
                user_type: "B",
                username: values.username,
                password: values.password,
            }).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );

        return response.data;
    } catch (error) {
        // Throw an error if the request fails
        throw error.response?.data || error.message;
    }
};
