const API_URL = 'https://vector-collection-backend.vercel.app';

// Fetch all vectors
export const fetchAllVectors = async () => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${API_URL}/auth/all-vectors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

// Fetch vectors uploaded by the authenticated user
export const fetchUserVectors = async () => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${API_URL}/auth/user-vectors`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the headers
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

// Fetch user profile
export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the headers
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
