import axios from 'axios';


export const fetchAgentData = async (BID, token) => {
  try {

    const apiUrl =  `${process.env.REACT_APP_API_URL}/bank/agents`;

 
    const response = await axios.post(
      apiUrl,
      JSON.stringify({ id: BID }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
