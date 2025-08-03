import React from 'react';

const PriceChart = ({ oilData, eventsData, changePointData, filters }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Brent Oil Price Chart</h3>
        <p className="card-subtitle">Historical prices with change point and major events</p>
      </div>
      <div style={{ padding: '20px', textAlign: 'center', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h4>Interactive Price Chart</h4>
          <p>This component would display:</p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Time series plot of Brent oil prices</li>
            <li>Detected change point with credible interval</li>
            <li>Major events marked on timeline</li>
            <li>Interactive zoom and pan functionality</li>
            <li>Event tooltips with details</li>
          </ul>
          {oilData && (
            <p><strong>Data loaded:</strong> {oilData.summary?.count || 0} price points</p>
          )}
          {changePointData && (
            <p><strong>Change Point:</strong> {changePointData.changepoint_date}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceChart;