import React, { useState, useEffect } from 'react';
import PriceChart from './PriceChart';
import ChangePointAnalysis from './ChangePointAnalysis';
import EventCorrelation from './EventCorrelation';
import KeyInsights from './KeyInsights';
import DataSummary from './DataSummary';
import FilterControls from './FilterControls';
import ExportControls from './ExportControls';
import { fetchOilPrices, fetchEvents, fetchEventCorrelation } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ analysisSummary }) => {
  const [oilData, setOilData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [correlationData, setCorrelationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    eventCategory: null
  });

  // Load data on component mount and when filters change
  useEffect(() => {
    loadDashboardData();
  }, [filters]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load oil prices with date filters
      const oilResponse = await fetchOilPrices(
        filters.startDate,
        filters.endDate
      );
      setOilData(oilResponse);

      // Load events with filters
      const eventsResponse = await fetchEvents(
        filters.eventCategory,
        filters.startDate,
        filters.endDate
      );
      setEventsData(eventsResponse);

      // Load correlation data
      const correlationResponse = await fetchEventCorrelation();
      setCorrelationData(correlationResponse);

    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-message">
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="row">
          <div className="col-8">
            <h1 className="dashboard-title">Brent Oil Price Analysis Dashboard</h1>
            <p className="dashboard-subtitle">
              Interactive visualization of change point detection and event correlation analysis
            </p>
          </div>
          <div className="col-4">
            <ExportControls />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="dashboard-section">
        <FilterControls 
          filters={filters}
          onFilterChange={handleFilterChange}
          eventsData={eventsData}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Key Insights */}
      <div className="dashboard-section">
        <KeyInsights 
          analysisSummary={analysisSummary}
          correlationData={correlationData}
        />
      </div>

      {/* Main Charts Row */}
      <div className="dashboard-section">
        <div className="row">
          {/* Price Chart */}
          <div className="col-8">
            <PriceChart 
              oilData={oilData}
              eventsData={eventsData}
              changePointData={analysisSummary?.changepoint}
              filters={filters}
            />
          </div>
          
          {/* Data Summary */}
          <div className="col-4">
            <DataSummary 
              oilData={oilData}
              eventsData={eventsData}
              analysisSummary={analysisSummary}
            />
          </div>
        </div>
      </div>

      {/* Analysis Results Row */}
      <div className="dashboard-section">
        <div className="row">
          {/* Change Point Analysis */}
          <div className="col-6">
            <ChangePointAnalysis 
              changePointData={analysisSummary?.changepoint}
              oilData={oilData}
            />
          </div>
          
          {/* Event Correlation */}
          <div className="col-6">
            <EventCorrelation 
              correlationData={correlationData}
              changePointData={analysisSummary?.changepoint}
              eventsData={eventsData}
            />
          </div>
        </div>
      </div>

      {/* Additional Analysis Section */}
      <div className="dashboard-section">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Analysis Methodology</h3>
              </div>
              <div className="methodology-content">
                <div className="row">
                  <div className="col-4">
                    <h4>1. Change Point Detection</h4>
                    <p>
                      We used Bayesian Change Point Detection with PyMC3 to identify 
                      structural breaks in Brent oil price time series. The model 
                      estimates the most likely location of regime changes in the 
                      mean return behavior.
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>2. Event Correlation</h4>
                    <p>
                      Major geopolitical and economic events are temporally correlated 
                      with detected change points to identify potential causal relationships. 
                      We analyze events within credible intervals and measure their 
                      proximity to structural breaks.
                    </p>
                  </div>
                  <div className="col-4">
                    <h4>3. Impact Quantification</h4>
                    <p>
                      For events near change points, we quantify price impact using 
                      30-day windows before and after events. This includes percentage 
                      price changes and volatility shifts to assess market reactions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Information */}
      <div className="dashboard-footer">
        <div className="row">
          <div className="col-6">
            <h4>Data Sources</h4>
            <ul>
              <li>Brent Oil Prices: Historical daily closing prices</li>
              <li>Major Events: Curated geopolitical and economic events (1990-2022)</li>
              <li>Analysis Period: {analysisSummary?.price_summary?.start_date} to {analysisSummary?.price_summary?.end_date}</li>
            </ul>
          </div>
          <div className="col-6">
            <h4>Technical Details</h4>
            <ul>
              <li>Model: Bayesian Change Point Detection (PyMC3)</li>
              <li>Sampling: NUTS (No-U-Turn Sampler)</li>
              <li>Credible Intervals: 95% posterior probability</li>
              <li>Event Window: ±30 days for impact analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;