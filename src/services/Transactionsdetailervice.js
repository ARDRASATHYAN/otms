import axios from 'axios';

// Function to fetch transaction data
export const fetchTransactionsDatails = async (BID, token,id) => {
  try {
    // Construct the API URL from environment variables
    const apiUrl = `${process.env.REACT_APP_API_URL}/bank/transactions`;

    // Send the POST request with bid in the body and token in headers
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ bid: BID,id: id  }),
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the full API response
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; // Throw error to be handled in the component
  }
};
