import React, { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';
import './Header.css';

const Header = ({ analysisSummary }) => {
  const [serverStatus, setServerStatus] = useState('checking');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    checkServerHealth();
    const interval = setInterval(checkServerHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkServerHealth = async () => {
    try {
      const health = await checkHealth();
      setServerStatus('online');
      setLastUpdated(new Date(health.timestamp));
    } catch (error) {
      setServerStatus('offline');
    }
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'online': return '#4CAF50';
      case 'offline': return '#f44336';
      default: return '#ff9800';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      default: return 'Checking...';
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Unknown';
    return lastUpdated.toLocaleString();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M10 20 L15 15 L20 25 L25 10 L30 20" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="20" cy="20" r="2" fill="white"/>
              </svg>
            </div>
            <div className="title-section">
              <h1 className="main-title">Brent Oil Analysis</h1>
              <p className="subtitle">Change Point Detection & Event Correlation</p>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          {analysisSummary?.changepoint && (
            <div className="key-metrics">
              <div className="metric">
                <span className="metric-label">Change Point</span>
                <span className="metric-value">
                  {new Date(analysisSummary.changepoint.changepoint_date).toLocaleDateString()}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Confidence</span>
                <span className="metric-value">
                  {(analysisSummary.changepoint.prob_increase * 100).toFixed(1)}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Data Points</span>
                <span className="metric-value">
                  {analysisSummary.price_summary?.total_observations?.toLocaleString() || 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="header-right">
          <div className="status-section">
            <div className="server-status">
              <div 
                className="status-indicator"
                style={{ backgroundColor: getStatusColor() }}
              ></div>
              <div className="status-info">
                <span className="status-text">Server: {getStatusText()}</span>
                <span className="last-updated">Updated: {formatLastUpdated()}</span>
              </div>
            </div>
            
            <div className="analysis-info">
              {analysisSummary?.data_quality && (
                <div className="data-quality">
                  <span className="quality-label">Analysis Date:</span>
                  <span className="quality-value">
                    {new Date(analysisSummary.data_quality.analysis_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar for loading states */}
      {serverStatus === 'checking' && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}
    </header>
  );
};

export default Header;