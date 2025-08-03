import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '40px',
      padding: '30px 0',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        <div className="row">
          <div className="col-4">
            <h4 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
              About This Analysis
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.9)' }}>
              This dashboard presents a comprehensive analysis of Brent oil price volatility using 
              Bayesian change point detection methods to identify structural breaks and correlate 
              them with major geopolitical and economic events.
            </p>
          </div>
          <div className="col-4">
            <h4 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
              Methodology
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Bayesian structural break detection
              </li>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Temporal event correlation analysis
              </li>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Statistical impact quantification
              </li>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Causal inference framework
              </li>
            </ul>
          </div>
          <div className="col-4">
            <h4 style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600' }}>
              Data Sources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Historical Brent oil prices
              </li>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Major geopolitical events
              </li>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Economic indicators
              </li>
              <li style={{ marginBottom: '8px', fontSize: '0.9rem', paddingLeft: '15px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                Market volatility metrics
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            © 2024 Oil Price Volatility Analysis Dashboard | 
            Built with React & Flask | 
            Powered by Bayesian Analytics
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;