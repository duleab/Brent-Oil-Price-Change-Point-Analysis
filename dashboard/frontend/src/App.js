import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchAnalysisSummary } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysisSummary, setAnalysisSummary] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const summary = await fetchAnalysisSummary();
        setAnalysisSummary(summary);
        setError(null);
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load analysis data. Please ensure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <Header />
        <LoadingSpinner message="Loading Brent oil analysis data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <ErrorMessage 
          message={error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <Header analysisSummary={analysisSummary} />
      <main className="main-content">
        <Dashboard analysisSummary={analysisSummary} />
      </main>
      <footer className="footer">
        <p>&copy; 2024 Brent Oil Price Analysis Dashboard | Change Point Detection & Event Correlation</p>
      </footer>
    </div>
  );
}

export default App;