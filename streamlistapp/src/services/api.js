// API service for handling external API calls

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

export const apiClient = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API PUT error:', error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API DELETE error:', error);
      throw error;
    }
  },
};

// Movie-specific API calls
export const movieAPI = {
  getMovies: () => apiClient.get('/movies'),
  getMovie: (id) => apiClient.get(`/movies/${id}`),
  searchMovies: (query) => apiClient.get(`/movies/search?q=${query}`),
};

// Stream-specific API calls
export const streamAPI = {
  getStreams: () => apiClient.get('/streams'),
  getStream: (id) => apiClient.get(`/streams/${id}`),
  createStream: (data) => apiClient.post('/streams', data),
  updateStream: (id, data) => apiClient.put(`/streams/${id}`, data),
  deleteStream: (id) => apiClient.delete(`/streams/${id}`),
};