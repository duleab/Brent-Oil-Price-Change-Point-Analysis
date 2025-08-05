from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data generation function
def generate_sample_data():
    """
    Generate sample Brent oil price data with events
    In a real application, this would connect to your actual data sources
    """
    dates = []
    prices = []
    
    # Generate sample price data
    start_date = datetime(2020, 1, 1)
    end_date = datetime(2023, 12, 31)
    current_date = start_date
    
    while current_date <= end_date:
        dates.append(current_date.strftime('%Y-%m-%d'))
        
        # Generate realistic oil price movements
        days_since_start = (current_date - start_date).days
        base_price = 60 + np.sin(days_since_start / 365 * 2 * np.pi) * 20
        volatility = np.random.normal(0, 5)
        price = max(10, base_price + volatility)
        prices.append(round(price, 2))
        
        current_date += timedelta(days=7)  # Weekly data
    
    events = [
        {
            'date': '2020-03-01',
            'event': 'COVID-19 Pandemic Start',
            'price': 45.2,
            'description': 'Global pandemic declaration leads to oil demand collapse'
        },
        {
            'date': '2020-04-20',
            'event': 'Oil Price Crash',
            'price': 18.1,
            'description': 'Historic oil price crash with negative futures prices'
        },
        {
            'date': '2021-11-01',
            'event': 'Supply Chain Crisis',
            'price': 84.3,
            'description': 'Global supply chain disruptions drive energy prices up'
        },
        {
            'date': '2022-02-24',
            'event': 'Russia-Ukraine Conflict',
            'price': 105.7,
            'description': 'Geopolitical tensions disrupt global energy markets'
        },
        {
            'date': '2022-12-01',
            'event': 'China COVID Policy Changes',
            'price': 88.9,
            'description': 'China relaxes COVID policies, affecting global demand'
        }
    ]
    
    return {
        'dates': dates,
        'prices': prices,
        'events': events
    }

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Brent Oil Analysis API'
    })

@app.route('/api/data', methods=['GET'])
def get_oil_data():
    """Get oil price data with optional date filtering"""
    try:
        # Get query parameters
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        # Generate sample data
        data = generate_sample_data()
        
        # Filter data if date range is provided
        if start_date or end_date:
            filtered_dates = []
            filtered_prices = []
            
            for i, date in enumerate(data['dates']):
                include_date = True
                
                if start_date and date < start_date:
                    include_date = False
                if end_date and date > end_date:
                    include_date = False
                    
                if include_date:
                    filtered_dates.append(date)
                    filtered_prices.append(data['prices'][i])
            
            data['dates'] = filtered_dates
            data['prices'] = filtered_prices
        
        return jsonify({
            'success': True,
            'data': data,
            'count': len(data['dates'])
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/events', methods=['GET'])
def get_events():
    """Get market events data"""
    try:
        data = generate_sample_data()
        return jsonify({
            'success': True,
            'events': data['events'],
            'count': len(data['events'])
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/statistics', methods=['GET'])
def get_statistics():
    """Get statistical analysis of oil prices"""
    try:
        data = generate_sample_data()
        prices = np.array(data['prices'])
        
        # Calculate statistics
        stats = {
            'mean_price': round(np.mean(prices), 2),
            'median_price': round(np.median(prices), 2),
            'std_deviation': round(np.std(prices), 2),
            'min_price': round(np.min(prices), 2),
            'max_price': round(np.max(prices), 2),
            'volatility': round(np.std(prices), 2),
            'total_observations': len(prices),
            'change_points': len(data['events'])
        }
        
        return jsonify({
            'success': True,
            'statistics': stats
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/volatility', methods=['GET'])
def get_volatility():
    """Get volatility analysis"""
    try:
        window_size = int(request.args.get('window', 30))  # Default 30-day window
        
        data = generate_sample_data()
        prices = np.array(data['prices'])
        dates = data['dates']
        
        # Calculate rolling volatility
        volatility_data = []
        volatility_dates = []
        
        for i in range(window_size, len(prices)):
            window = prices[i-window_size:i]
            vol = np.std(window)
            volatility_data.append(round(vol, 2))
            volatility_dates.append(dates[i])
        
        return jsonify({
            'success': True,
            'volatility': {
                'dates': volatility_dates,
                'values': volatility_data,
                'window_size': window_size
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("Starting Brent Oil Analysis API...")
    print("Available endpoints:")
    print("  GET /api/health - Health check")
    print("  GET /api/data - Oil price data")
    print("  GET /api/events - Market events")
    print("  GET /api/statistics - Statistical analysis")
    print("  GET /api/volatility - Volatility analysis")
    print("\nAPI running on http://localhost:5000")
    
    app.run(debug=True, host='0.0.0.0', port=5000)