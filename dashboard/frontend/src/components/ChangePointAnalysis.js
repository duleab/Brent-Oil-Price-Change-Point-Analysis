import React from 'react';

const ChangePointAnalysis = ({ changePointData, oilData }) => {
  if (!changePointData) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Change Point Analysis</h3>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Change point data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Change Point Analysis</h3>
        <p className="card-subtitle">Bayesian structural break detection results</p>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="row">
          <div className="col-6">
            <h4>Detection Results</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><strong>Change Point Date:</strong> {changePointData.changepoint_date}</li>
              <li><strong>Credible Interval:</strong> {changePointData.credible_interval_start} to {changePointData.credible_interval_end}</li>
              <li><strong>Probability of Increase:</strong> {(changePointData.prob_increase * 100).toFixed(1)}%</li>
            </ul>
          </div>
          <div className="col-6">
            <h4>Parameter Changes</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><strong>Mean Before:</strong> {changePointData.mean_before?.toFixed(6) || 'N/A'}</li>
              <li><strong>Mean After:</strong> {changePointData.mean_after?.toFixed(6) || 'N/A'}</li>
              <li><strong>Mean Change:</strong> {changePointData.mean_change?.toFixed(6) || 'N/A'}</li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h5>Interpretation</h5>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            The Bayesian change point model detected a structural break on {changePointData.changepoint_date}. 
            {changePointData.mean_change > 0 
              ? 'This represents a shift toward higher volatility in oil returns.' 
              : 'This represents a shift toward lower volatility in oil returns.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePointAnalysis;