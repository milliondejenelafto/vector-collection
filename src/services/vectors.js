const API_URL = 'https://vector-collection-backend.vercel.app';

// Fetch all vectors
export const fetchAllVectors = async () => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${API_URL}/vector/all-vectors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the headers
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vectors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching vectors:', error);
    throw error;
  }
};