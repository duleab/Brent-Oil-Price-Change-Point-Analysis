import React from 'react';

const FilterControls = ({ filters, onFilterChange }) => {
  const handleDateChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.eventCategories.includes(category)
      ? filters.eventCategories.filter(c => c !== category)
      : [...filters.eventCategories, category];
    
    onFilterChange({
      ...filters,
      eventCategories: updatedCategories
    });
  };

  const resetFilters = () => {
    onFilterChange({
      startDate: '',
      endDate: '',
      eventCategories: []
    });
  };

  const eventCategories = [
    'Geopolitical',
    'Economic',
    'Oil Market',
    'Financial Crisis',
    'War/Conflict',
    'Policy'
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Filter Controls</h3>
        <p className="card-subtitle">Customize the analysis view</p>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="row">
          <div className="col-6">
            <h5>Date Range</h5>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Start Date:
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                End Date:
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>
          <div className="col-6">
            <h5>Event Categories</h5>
            <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
              {eventCategories.map(category => (
                <div key={category} style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input
                      type="checkbox"
                      checked={filters.eventCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      style={{ marginRight: '8px' }}
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={resetFilters}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            Reset Filters
          </button>
        </div>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            <strong>Active Filters:</strong>
            {filters.startDate && <span> Start: {filters.startDate}</span>}
            {filters.endDate && <span> End: {filters.endDate}</span>}
            {filters.eventCategories.length > 0 && (
              <span> Categories: {filters.eventCategories.join(', ')}</span>
            )}
            {!filters.startDate && !filters.endDate && filters.eventCategories.length === 0 && (
              <span> None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;