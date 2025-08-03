import React from 'react';

const DataSummary = ({ oilData, eventsData, changePointData }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Data Summary</h3>
        <p className="card-subtitle">Overview of datasets used in the analysis</p>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="row">
          <div className="col-4">
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#007bff', margin: '0 0 10px 0' }}>
                {oilData?.summary?.count || 'N/A'}
              </h4>
              <p style={{ margin: '0', fontWeight: 'bold' }}>Price Data Points</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                {oilData?.summary?.date_range || 'Date range not available'}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>
                {eventsData?.length || 'N/A'}
              </h4>
              <p style={{ margin: '0', fontWeight: 'bold' }}>Major Events</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                Geopolitical & Economic
              </p>
            </div>
          </div>
          <div className="col-4">
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#dc3545', margin: '0 0 10px 0' }}>
                {changePointData ? '1' : '0'}
              </h4>
              <p style={{ margin: '0', fontWeight: 'bold' }}>Change Point</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                {changePointData?.changepoint_date || 'Not detected'}
              </p>
            </div>
          </div>
        </div>
        
        {oilData?.summary && (
          <div style={{ marginTop: '20px' }}>
            <h4>Price Statistics</h4>
            <div className="row">
              <div className="col-3">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#007bff' }}>
                    ${oilData.summary.mean?.toFixed(2) || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Mean Price</div>
                </div>
              </div>
              <div className="col-3">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745' }}>
                    ${oilData.summary.min?.toFixed(2) || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Minimum</div>
                </div>
              </div>
              <div className="col-3">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#dc3545' }}>
                    ${oilData.summary.max?.toFixed(2) || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Maximum</div>
                </div>
              </div>
              <div className="col-3">
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffc107' }}>
                    {oilData.summary.std?.toFixed(2) || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Std Dev</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h5 style={{ color: '#856404', marginBottom: '10px' }}>Data Sources</h5>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#856404' }}>
            <li>Brent oil prices: Historical daily closing prices</li>
            <li>Major events: Curated list of significant geopolitical and economic events</li>
            <li>Change points: Detected using Bayesian structural break analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataSummary;