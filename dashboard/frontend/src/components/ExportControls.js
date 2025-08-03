import React, { useState } from 'react';
import { exportData } from '../services/api';

const ExportControls = ({ oilData, eventsData, changePointData, correlationData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');

  const handleExport = async (format) => {
    setIsExporting(true);
    setExportStatus('Preparing export...');
    
    try {
      const response = await exportData(format);
      
      if (response.download_url) {
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = response.download_url;
        link.download = response.filename || `oil_analysis_export.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setExportStatus('Export completed successfully!');
      } else {
        setExportStatus('Export completed!');
      }
    } catch (error) {
      console.error('Export failed:', error);
      setExportStatus('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const exportFormats = [
    { format: 'csv', label: 'CSV', description: 'Comma-separated values for spreadsheet analysis' },
    { format: 'json', label: 'JSON', description: 'JavaScript Object Notation for programmatic use' },
    { format: 'pdf', label: 'PDF', description: 'Portable Document Format report' }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Export Data</h3>
        <p className="card-subtitle">Download analysis results in various formats</p>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="row">
          {exportFormats.map(({ format, label, description }) => (
            <div key={format} className="col-4">
              <div style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '10px'
              }}>
                <h5 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{label}</h5>
                <p style={{ margin: '0 0 15px 0', fontSize: '0.8rem', color: '#666' }}>
                  {description}
                </p>
                <button
                  onClick={() => handleExport(format)}
                  disabled={isExporting}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: isExporting ? '#6c757d' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isExporting ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                  onMouseOver={(e) => {
                    if (!isExporting) e.target.style.backgroundColor = '#0056b3';
                  }}
                  onMouseOut={(e) => {
                    if (!isExporting) e.target.style.backgroundColor = '#007bff';
                  }}
                >
                  {isExporting ? 'Exporting...' : `Export ${label}`}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {exportStatus && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: exportStatus.includes('failed') ? '#f8d7da' : '#d4edda',
            color: exportStatus.includes('failed') ? '#721c24' : '#155724',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {exportStatus}
          </div>
        )}
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#495057' }}>Export Contents</h5>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#666' }}>
            <li>Oil price data and statistical summaries</li>
            <li>Change point detection results and parameters</li>
            <li>Event correlation analysis and proximity statistics</li>
            <li>Major events data with impact assessments</li>
            <li>Methodology documentation and interpretation</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8rem', color: '#856404' }}>
            <strong>Note:</strong> Exported data includes all analysis results and can be used for further research, 
            reporting, or integration with other analytical tools.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;