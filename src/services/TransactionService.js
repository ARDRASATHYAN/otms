import axios from 'axios';


export const fetchTransactionData = async (BID, token) => {
  try {
    
    const apiUrl = `${process.env.REACT_APP_API_URL}/bank/txnsummary`;

    const response = await axios.post(
      apiUrl,
      JSON.stringify({ bid: BID }),
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; 
  }
};
