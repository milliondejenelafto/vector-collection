const API_URL = 'http://localhost:5000';

// Fetch all vectors
export const fetchAllVectors = async () => {
  try {
    const response = await fetch(`${API_URL}/vector/all-vectors`, {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
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

// Fetch user vectors
export const fetchUserVectors = async () => {
  try {
    const response = await fetch(`${API_URL}/vector/user-vectors`, {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user vectors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user vectors:', error);
    throw error;
  }
};
