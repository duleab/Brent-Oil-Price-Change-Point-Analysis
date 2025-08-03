import React from 'react';

const EventCorrelation = ({ correlationData, changePointData, eventsData }) => {
  if (!correlationData) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Event Correlation</h3>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Event correlation data not available</p>
        </div>
      </div>
    );
  }

  const { event_correlation, nearby_events, event_impacts } = correlationData;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Event Correlation Analysis</h3>
        <p className="card-subtitle">Temporal relationship between events and change points</p>
      </div>
      <div style={{ padding: '20px' }}>
        {event_correlation && (
          <div className="row" style={{ marginBottom: '20px' }}>
            <div className="col-6">
              <h4>Proximity Statistics</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><strong>Events within 1 year:</strong> {event_correlation.events_within_1year || 0}</li>
                <li><strong>Events within 2 years:</strong> {event_correlation.events_within_2years || 0}</li>
                <li><strong>Closest event:</strong> {event_correlation.closest_event_days || 'N/A'} days</li>
              </ul>
            </div>
            <div className="col-6">
              <h4>Statistical Summary</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><strong>Total events analyzed:</strong> {event_correlation.total_events || 0}</li>
                <li><strong>Mean distance:</strong> {event_correlation.mean_distance_days?.toFixed(1) || 'N/A'} days</li>
                <li><strong>Events in CI:</strong> {event_correlation.events_within_ci || 0}</li>
              </ul>
            </div>
          </div>
        )}
        
        {nearby_events && nearby_events.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Closest Events to Change Point</h4>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {nearby_events.slice(0, 5).map((event, index) => (
                <div key={index} style={{ 
                  padding: '10px', 
                  margin: '5px 0', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '6px',
                  borderLeft: '4px solid #007bff'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {event.Event || 'Unknown Event'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {event.Date} • {event.Category} • {event.Abs_Days_to_CP || event.abs_days_to_cp} days from change point
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {event_impacts && event_impacts.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h4>Event Impact Analysis</h4>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {event_impacts.slice(0, 3).map((impact, index) => (
                <div key={index} style={{ 
                  padding: '8px', 
                  margin: '3px 0', 
                  backgroundColor: impact.price_change_pct > 0 ? '#d4edda' : '#f8d7da', 
                  borderRadius: '4px',
                  fontSize: '0.85rem'
                }}>
                  <strong>{impact.event_name}</strong>: {impact.price_change_pct?.toFixed(2)}% price change
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
          <h5>Correlation Insights</h5>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#0066cc' }}>
            {event_correlation?.events_within_1year > 0 
              ? `${event_correlation.events_within_1year} major events occurred within 1 year of the detected change point, suggesting potential causal relationships.`
              : 'No major events detected within 1 year of the change point.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCorrelation;