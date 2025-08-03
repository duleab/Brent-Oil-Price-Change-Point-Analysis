import React from 'react';

const KeyInsights = ({ analysisSummary, changePointData, correlationData }) => {
  const insights = analysisSummary?.key_insights || [];
  
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Key Insights</h3>
        <p className="card-subtitle">Main findings from the analysis</p>
      </div>
      <div style={{ padding: '20px' }}>
        {insights.length > 0 ? (
          <div className="row">
            {insights.map((insight, index) => (
              <div key={index} className="col-4" style={{ marginBottom: '15px' }}>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745',
                  height: '100%'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#28a745' }}>
                    Insight {index + 1}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {insight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col-4">
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#28a745' }}>
                    Change Point Detection
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {changePointData 
                      ? `Structural break detected on ${changePointData.changepoint_date} with ${(changePointData.prob_increase * 100).toFixed(1)}% probability of increase.`
                      : 'Change point analysis provides insights into structural breaks in oil price volatility.'}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #007bff'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#007bff' }}>
                    Event Correlation
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {correlationData?.event_correlation 
                      ? `${correlationData.event_correlation.events_within_1year || 0} major events occurred within 1 year of the change point.`
                      : 'Analysis reveals temporal relationships between geopolitical events and market volatility.'}
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  borderLeft: '4px solid #ffc107'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#e68900' }}>
                    Market Impact
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {changePointData?.mean_change 
                      ? `Mean volatility ${changePointData.mean_change > 0 ? 'increased' : 'decreased'} by ${Math.abs(changePointData.mean_change * 100).toFixed(2)}% after the change point.`
                      : 'Quantitative analysis of price volatility changes around structural breaks.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <h5 style={{ color: '#0066cc', marginBottom: '10px' }}>Analysis Summary</h5>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#004499', lineHeight: '1.5' }}>
            This dashboard presents a comprehensive analysis of Brent oil price volatility using Bayesian change point detection. 
            The analysis identifies structural breaks in the time series and correlates them with major geopolitical and economic events 
            to understand potential causal relationships and market dynamics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyInsights;