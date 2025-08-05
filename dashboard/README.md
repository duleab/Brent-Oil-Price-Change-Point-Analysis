# Brent Oil Price Analysis Dashboard

A modern, interactive dashboard for visualizing Brent oil price analysis results, built with React (Vite) frontend and Flask backend.

## Features

- **Interactive Price Charts**: Visualize Brent oil prices over time with Plotly.js
- **Change Point Detection**: Highlight major market events and their impact
- **Volatility Analysis**: 30-day rolling volatility calculations
- **Event Impact Analysis**: Quantify price changes around major events
- **Date Range Filtering**: Filter data by custom date ranges
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Hot module replacement for development

## Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Plotly.js** for interactive charts
- **Custom CSS** for styling (Tailwind-ready)
- **Lucide React** icons (replaced with custom SVG icons)

### Backend
- **Flask** REST API
- **Flask-CORS** for cross-origin requests
- **Pandas** for data manipulation
- **NumPy** for statistical calculations

## Project Structure

```
dashboard/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx          # Main dashboard component
│   │   ├── App.css          # Dashboard styles
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # React entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── backend/                 # Flask backend API
│   ├── app.py              # Main Flask application
│   └── requirements.txt     # Backend dependencies
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd dashboard/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd dashboard/backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

5. The API will be available at `http://localhost:5000`

## API Endpoints

The Flask backend provides the following REST API endpoints:

### Health Check
- **GET** `/api/health`
- Returns API status and timestamp

### Oil Price Data
- **GET** `/api/data`
- Query parameters:
  - `start_date` (optional): Filter start date (YYYY-MM-DD)
  - `end_date` (optional): Filter end date (YYYY-MM-DD)
- Returns oil price time series data

### Market Events
- **GET** `/api/events`
- Returns major market events with dates and descriptions

### Statistical Analysis
- **GET** `/api/statistics`
- Returns statistical measures (mean, median, volatility, etc.)

### Volatility Analysis
- **GET** `/api/volatility`
- Query parameters:
  - `window` (optional): Rolling window size (default: 30)
- Returns rolling volatility calculations

## Development

### Frontend Development

The frontend uses Vite for fast development with hot module replacement (HMR). Any changes to React components will automatically reload in the browser.

**Key Components:**
- `App.jsx`: Main dashboard with all visualizations
- Custom SVG icons for better performance
- Responsive grid layouts
- Interactive Plotly charts

### Backend Development

The Flask backend is configured for development with debug mode enabled. The API uses CORS to allow requests from the frontend.

**Key Features:**
- Sample data generation for demonstration
- RESTful API design
- Error handling and validation
- Statistical calculations with NumPy

## Data Integration

Currently, the dashboard uses sample data for demonstration. To integrate with real data:

1. **Replace sample data generation** in `backend/app.py`
2. **Connect to your data sources** (databases, APIs, files)
3. **Update the data processing logic** as needed
4. **Modify frontend API calls** if endpoint structure changes

## Customization

### Adding New Charts
1. Create new Plotly chart configurations in `App.jsx`
2. Add corresponding API endpoints in `app.py`
3. Update the dashboard layout as needed

### Styling
- Modify `src/index.css` for global styles
- Update `src/App.css` for component-specific styles
- The project is ready for Tailwind CSS integration if needed

### API Extensions
- Add new endpoints in `app.py`
- Implement additional statistical analyses
- Add data validation and authentication as needed

## Production Deployment

### Frontend
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to your web server

### Backend
1. Use a production WSGI server (e.g., Gunicorn)
2. Configure environment variables
3. Set up proper database connections
4. Implement authentication and rate limiting

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Flask-CORS is installed and configured
2. **Port Conflicts**: Change ports in Vite config or Flask app
3. **Dependency Issues**: Clear node_modules and reinstall
4. **API Connection**: Verify backend is running on correct port

### Development Tips

- Use browser developer tools to debug frontend issues
- Check Flask console for backend errors
- Verify API responses with tools like Postman
- Use React Developer Tools for component debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the 10 Academy Week 10 assignment for Brent oil price analysis.