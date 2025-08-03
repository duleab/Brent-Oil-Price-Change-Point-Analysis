import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error('Data not found. Please ensure the analysis has been completed.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please check if the backend is running.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    } else if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error. Please check your connection and ensure the backend server is running.');
    }
    
    throw error;
  }
);

// API Functions

/**
 * Health check endpoint
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error(`Health check failed: ${error.message}`);
  }
};

/**
 * Fetch oil price data with optional date filtering
 */
export const fetchOilPrices = async (startDate = null, endDate = null) => {
  try {
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    const response = await api.get('/oil-prices', { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch oil prices: ${error.message}`);
  }
};

/**
 * Fetch major events data with optional filtering
 */
export const fetchEvents = async (category = null, startDate = null, endDate = null) => {
  try {
    const params = {};
    if (category) params.category = category;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }
};

/**
 * Fetch change point analysis results
 */
export const fetchChangePoint = async () => {
  try {
    const response = await api.get('/changepoint');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch change point data: ${error.message}`);
  }
};

/**
 * Fetch event correlation analysis results
 */
export const fetchEventCorrelation = async () => {
  try {
    const response = await api.get('/event-correlation');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch event correlation data: ${error.message}`);
  }
};

/**
 * Fetch comprehensive analysis summary
 */
export const fetchAnalysisSummary = async () => {
  try {
    const response = await api.get('/analysis-summary');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch analysis summary: ${error.message}`);
  }
};

/**
 * Fetch detailed price analysis
 */
export const fetchPriceAnalysis = async () => {
  try {
    const response = await api.get('/price-analysis');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch price analysis: ${error.message}`);
  }
};

/**
 * Export analysis data
 */
export const exportData = async (format = 'json') => {
  try {
    const response = await api.get('/export-data', {
      params: { format },
      timeout: 30000, // Longer timeout for export
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to export data: ${error.message}`);
  }
};

// Utility functions

/**
 * Format date for API requests
 */
export const formatDateForAPI = (date) => {
  if (!date) return null;
  if (typeof date === 'string') return date;
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return null;
};

/**
 * Parse date from API response
 */
export const parseDateFromAPI = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString);
};

/**
 * Check if API is available
 */
export const isAPIAvailable = async () => {
  try {
    await checkHealth();
    return true;
  } catch (error) {
    console.warn('API not available:', error.message);
    return false;
  }
};

/**
 * Retry function for failed requests
 */
export const retryRequest = async (requestFunction, maxRetries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFunction();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      console.warn(`Request failed (attempt ${attempt}/${maxRetries}):`, error.message);
      console.log(`Retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
};

export default api;