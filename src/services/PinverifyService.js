import axios from 'axios';

/**
 * Function to verify PIN by sending a request to the backend API
 * @param {string} token - The authorization token to send in the request header
 * @param {string} mobile - The mobile number of the user
 * @param {string} pin - The PIN entered by the user
 * @param {string} deviceId - The device ID
 * @returns {Promise<Object>} - The response from the server
 * @throws Will throw an error if the request fails
 */
export const verifyPin = async (token, mobile, pin, deviceId) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/bank/validatepin`, 
            JSON.stringify({
                mobile,
                pin,
                DeviceId: deviceId,
            }),
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};


