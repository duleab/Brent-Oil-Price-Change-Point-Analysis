#!/usr/bin/env python3
"""
Comprehensive test suite for Brent Oil Price Change Point Analysis project.

This module contains unit tests, integration tests, and validation tests
to ensure code quality and reproducibility.
"""

import pytest
import pandas as pd
import numpy as np
import sys
import os
from datetime import datetime, timedelta
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

# Import dashboard backend for testing
try:
    sys.path.insert(0, str(project_root / 'dashboard' / 'backend'))
    from app import app, generate_sample_data
except ImportError:
    app = None
    generate_sample_data = None

class TestDataGeneration:
    """Test data generation and validation."""
    
    def test_sample_data_generation(self):
        """Test that sample data is generated correctly."""
        if generate_sample_data is None:
            pytest.skip("Backend app not available")
            
        data = generate_sample_data()
        
        # Test data structure
        assert 'dates' in data
        assert 'prices' in data
        assert 'events' in data
        
        # Test data types
        assert isinstance(data['dates'], list)
        assert isinstance(data['prices'], list)
        assert isinstance(data['events'], list)
        
        # Test data consistency
        assert len(data['dates']) == len(data['prices'])
        assert len(data['dates']) > 0
        
        # Test price validity
        for price in data['prices']:
            assert isinstance(price, (int, float))
            assert price > 0  # Oil prices should be positive
            assert price < 1000  # Reasonable upper bound
    
    def test_date_format_validation(self):
        """Test that dates are in correct format."""
        if generate_sample_data is None:
            pytest.skip("Backend app not available")
            
        data = generate_sample_data()
        
        for date_str in data['dates']:
            # Test date format (YYYY-MM-DD)
            try:
                datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                pytest.fail(f"Invalid date format: {date_str}")
    
    def test_events_structure(self):
        """Test that events have required fields."""
        if generate_sample_data is None:
            pytest.skip("Backend app not available")
            
        data = generate_sample_data()
        
        required_fields = ['date', 'event', 'price', 'description']
        
        for event in data['events']:
            for field in required_fields:
                assert field in event, f"Missing field '{field}' in event"
            
            # Validate event date format
            try:
                datetime.strptime(event['date'], '%Y-%m-%d')
            except ValueError:
                pytest.fail(f"Invalid event date format: {event['date']}")

class TestStatisticalFunctions:
    """Test statistical analysis functions."""
    
    def setup_method(self):
        """Set up test data."""
        np.random.seed(42)  # For reproducible tests
        self.sample_prices = np.random.normal(60, 10, 100)
        self.sample_prices = np.abs(self.sample_prices)  # Ensure positive prices
    
    def test_basic_statistics(self):
        """Test basic statistical calculations."""
        prices = self.sample_prices
        
        # Test mean calculation
        mean_price = np.mean(prices)
        assert isinstance(mean_price, (int, float))
        assert mean_price > 0
        
        # Test standard deviation
        std_dev = np.std(prices)
        assert isinstance(std_dev, (int, float))
        assert std_dev >= 0
        
        # Test min/max
        min_price = np.min(prices)
        max_price = np.max(prices)
        assert min_price <= max_price
        assert min_price >= 0
    
    def test_volatility_calculation(self):
        """Test volatility calculation with rolling windows."""
        prices = self.sample_prices
        window_size = 10
        
        volatility_values = []
        for i in range(window_size, len(prices)):
            window = prices[i-window_size:i]
            vol = np.std(window)
            volatility_values.append(vol)
        
        # Test volatility properties
        assert len(volatility_values) == len(prices) - window_size
        assert all(vol >= 0 for vol in volatility_values)
        assert all(isinstance(vol, (int, float)) for vol in volatility_values)

class TestAPIEndpoints:
    """Test Flask API endpoints."""
    
    def setup_method(self):
        """Set up test client."""
        if app is None:
            pytest.skip("Flask app not available")
        
        app.config['TESTING'] = True
        self.client = app.test_client()
    
    def test_health_endpoint(self):
        """Test health check endpoint."""
        response = self.client.get('/api/health')
        
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'status' in data
        assert 'timestamp' in data
        assert 'service' in data
        assert data['status'] == 'healthy'
    
    def test_data_endpoint(self):
        """Test oil data endpoint."""
        response = self.client.get('/api/data')
        
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'success' in data
        assert 'data' in data
        assert 'count' in data
        assert data['success'] is True
        
        # Test data structure
        oil_data = data['data']
        assert 'dates' in oil_data
        assert 'prices' in oil_data
        assert 'events' in oil_data
    
    def test_data_endpoint_with_filters(self):
        """Test oil data endpoint with date filters."""
        response = self.client.get('/api/data?start_date=2022-01-01&end_date=2022-12-31')
        
        assert response.status_code == 200
        
        data = response.get_json()
        assert data['success'] is True
        
        # Verify filtering worked
        dates = data['data']['dates']
        if dates:  # Only test if data exists in range
            assert all(date >= '2022-01-01' for date in dates)
            assert all(date <= '2022-12-31' for date in dates)
    
    def test_events_endpoint(self):
        """Test events endpoint."""
        response = self.client.get('/api/events')
        
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'success' in data
        assert 'events' in data
        assert 'count' in data
        assert data['success'] is True
    
    def test_statistics_endpoint(self):
        """Test statistics endpoint."""
        response = self.client.get('/api/statistics')
        
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'success' in data
        assert 'statistics' in data
        assert data['success'] is True
        
        # Test statistics structure
        stats = data['statistics']
        required_stats = ['mean_price', 'median_price', 'std_deviation', 
                         'min_price', 'max_price', 'volatility', 
                         'total_observations', 'change_points']
        
        for stat in required_stats:
            assert stat in stats
    
    def test_volatility_endpoint(self):
        """Test volatility endpoint."""
        response = self.client.get('/api/volatility')
        
        assert response.status_code == 200
        
        data = response.get_json()
        assert 'success' in data
        assert 'volatility' in data
        assert data['success'] is True
        
        # Test volatility structure
        vol_data = data['volatility']
        assert 'dates' in vol_data
        assert 'values' in vol_data
        assert 'window_size' in vol_data
    
    def test_volatility_endpoint_with_window(self):
        """Test volatility endpoint with custom window size."""
        window_size = 20
        response = self.client.get(f'/api/volatility?window={window_size}')
        
        assert response.status_code == 200
        
        data = response.get_json()
        vol_data = data['volatility']
        assert vol_data['window_size'] == window_size

class TestProjectStructure:
    """Test project structure and file organization."""
    
    def test_required_directories_exist(self):
        """Test that all required directories exist."""
        required_dirs = [
            'data',
            'data/raw',
            'data/processed', 
            'data/external',
            'notebooks',
            'results',
            'results/figures',
            'results/models',
            'tests',
            'docs',
            'config',
            'dashboard',
            'dashboard/frontend',
            'dashboard/backend'
        ]
        
        for dir_path in required_dirs:
            full_path = project_root / dir_path
            assert full_path.exists(), f"Required directory missing: {dir_path}"
    
    def test_required_files_exist(self):
        """Test that all required files exist."""
        required_files = [
            'README.md',
            'requirements.txt',
            'setup.py',
            '.gitignore',
            'config/config.yaml',
            'dashboard/backend/app.py',
            'dashboard/backend/requirements.txt',
            'dashboard/frontend/package.json'
        ]
        
        for file_path in required_files:
            full_path = project_root / file_path
            assert full_path.exists(), f"Required file missing: {file_path}"
    
    def test_requirements_file_validity(self):
        """Test that requirements.txt is valid."""
        req_file = project_root / 'requirements.txt'
        
        with open(req_file, 'r') as f:
            lines = f.readlines()
        
        # Test that file is not empty
        assert len(lines) > 0
        
        # Test that it contains key packages
        content = ''.join(lines).lower()
        key_packages = ['pandas', 'numpy', 'matplotlib', 'pymc', 'arviz']
        
        for package in key_packages:
            assert package in content, f"Missing key package: {package}"

class TestDataValidation:
    """Test data validation and integrity."""
    
    def test_price_data_validation(self):
        """Test price data validation rules."""
        # Test valid prices
        valid_prices = [50.0, 75.5, 100.25, 45.75]
        for price in valid_prices:
            assert self._is_valid_price(price)
        
        # Test invalid prices
        invalid_prices = [-10, 0, None, 'invalid', float('inf')]
        for price in invalid_prices:
            assert not self._is_valid_price(price)
    
    def _is_valid_price(self, price):
        """Helper function to validate oil prices."""
        try:
            price_float = float(price)
            return price_float > 0 and price_float < 1000 and not np.isnan(price_float) and not np.isinf(price_float)
        except (TypeError, ValueError):
            return False
    
    def test_date_validation(self):
        """Test date validation."""
        # Test valid dates
        valid_dates = ['2020-01-01', '2022-12-31', '2021-06-15']
        for date_str in valid_dates:
            assert self._is_valid_date(date_str)
        
        # Test invalid dates
        invalid_dates = ['invalid', '2020-13-01', '2020-01-32', None, '']
        for date_str in invalid_dates:
            assert not self._is_valid_date(date_str)
    
    def _is_valid_date(self, date_str):
        """Helper function to validate dates."""
        try:
            datetime.strptime(date_str, '%Y-%m-%d')
            return True
        except (TypeError, ValueError):
            return False

class TestReproducibility:
    """Test reproducibility and deterministic behavior."""
    
    def test_random_seed_consistency(self):
        """Test that random seed produces consistent results."""
        seed = 42
        
        # Generate data with same seed twice
        np.random.seed(seed)
        data1 = np.random.normal(0, 1, 100)
        
        np.random.seed(seed)
        data2 = np.random.normal(0, 1, 100)
        
        # Results should be identical
        np.testing.assert_array_equal(data1, data2)
    
    def test_sample_data_consistency(self):
        """Test that sample data generation is consistent."""
        if generate_sample_data is None:
            pytest.skip("Backend app not available")
        
        # Note: This test assumes sample data generation uses fixed parameters
        # In practice, you might want to add a seed parameter to generate_sample_data
        data1 = generate_sample_data()
        data2 = generate_sample_data()
        
        # Structure should be consistent
        assert len(data1['dates']) == len(data2['dates'])
        assert len(data1['events']) == len(data2['events'])

if __name__ == '__main__':
    # Run tests when script is executed directly
    pytest.main([__file__, '-v'])