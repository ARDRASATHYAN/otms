import axios from 'axios';


export const fetchTransactionsDatails = async (BID, token,id) => {
  try {
   
    const apiUrl = `${process.env.REACT_APP_API_URL}/bank/transactions`;

   
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

    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error; 
  }
};
