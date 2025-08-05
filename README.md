# Brent Oil Price Change Point Analysis

A comprehensive analysis of Brent crude oil price data to identify structural breaks and change points using statistical and machine learning techniques, featuring an interactive dashboard and containerized deployment.

##  Project Overview

This project analyzes historical Brent crude oil prices to detect significant change points that correspond to major market events. Using advanced statistical methods and Bayesian inference, I identify structural breaks in the time series data and correlate them with historical market events. The project includes a modern web dashboard for interactive data exploration and is fully containerized using Docker.

##  Objectives

- Perform exploratory data analysis on Brent oil price data
- Implement change point detection algorithms
- Correlate detected change points with major market events
- Develop insights into oil market volatility patterns
- Provide an interactive web dashboard for data visualization
- Demonstrate modern DevOps practices with Docker containerization

## Project Structure

```
├── dashboard/                  # Interactive web dashboard
│   ├── backend/                # Flask API backend
│   │   ├── app.py              # Main Flask application
│   │   └── requirements.txt    # Backend dependencies
│   ├── frontend/               # React frontend
│   │   ├── src/                # React source code
│   │   ├── public/             # Static assets
│   │   ├── package.json        # Frontend dependencies
│   │   └── vite.config.js      # Vite build configuration
│   └── README.md               # Dashboard documentation
├── notebooks/
│   ├── Brent_Oil_Price_Change_Point_Analysis.ipynb
│   └── Bayesian_change_point_detection_using_PyMC3.ipynb
├── config/                     # Configuration files
│   └── config.yaml             # Analysis parameters and settings
├── Dockerfile                  # Docker container configuration
├── docker-compose.yml          # Multi-service orchestration
├── requirements.txt            # Python dependencies
├── setup.py                    # Automated setup script
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

##  Technologies Used

### Core Analysis
- **Python**: Primary programming language
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Matplotlib/Seaborn/Plotly**: Data visualization
- **Jupyter Notebooks**: Interactive analysis environment
- **Statistical Libraries**: For change point detection algorithms

### Dashboard Stack
- **Backend**: Flask (Python web framework)
- **Frontend**: React with Vite (Modern JavaScript framework)
- **Styling**: Tailwind CSS (Utility-first CSS framework)
- **API**: RESTful endpoints for data access

### DevOps & Deployment
- **Docker**: Containerization platform
- **Docker Compose**: Multi-container orchestration
- **Redis**: Caching and session management
- **PostgreSQL**: Production database (optional)
- **Nginx**: Reverse proxy and load balancer
- **Prometheus & Grafana**: Monitoring and visualization

##  Key Features

- **Exploratory Data Analysis**: Comprehensive statistical analysis of oil price data
- **Change Point Detection**: Implementation of multiple algorithms to identify structural breaks
- **Event Correlation**: Mapping detected change points to historical market events
- **Visualization**: Interactive plots and charts for data insights

##  Getting Started

### Prerequisites

- **For Local Development**:
  - Python 3.8 or higher
  - Node.js 16 or higher
  - npm or yarn package manager

- **For Docker Deployment**:
  - Docker Desktop (Windows)
  - Docker Compose 
### Quick Start with Dashboard

#### Option 1: Local Development (Fastest)

1. **Clone the repository**:
```bash
git clone https://github.com/duleab/Brent-Oil-Price-Change-Point-Analysis.git
cd Brent-Oil-Price-Change-Point-Analysis
```

2. **Start the Backend**:
```bash
cd dashboard/backend
pip install -r requirements.txt
python app.py
```
Backend will run on: http://localhost:5000

3. **Start the Frontend** (in a new terminal):
```bash
cd dashboard/frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

4. **Access the Dashboard**:
Open your browser and go to http://localhost:5173

#### Option 2: Docker Deployment (Production-Ready)

1. **Clone the repository** (as above)

2. **Start with Docker Compose**:
```bash
# Basic dashboard setup
docker-compose up -d backend frontend redis

# Or start everything (including monitoring)
docker-compose --profile production --profile monitoring up -d
```

3. **Access the Services**:
- Dashboard: http://localhost:3000
- API: http://localhost:5000
- Jupyter Lab: http://localhost:8888 (token: brent-analysis-token)

#### Option 3: Traditional Setup

1. Clone the repository (as above)

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install required packages:
```bash
pip install -r requirements.txt
```

4. Run the automated setup script:
```bash
python setup.py
```

### Running the Analysis

#### Interactive Dashboard
Once the dashboard is running, you can:
- View real-time oil price data and trends
- Explore change point detection results
- Analyze market events and correlations
- Generate custom reports and visualizations

#### Jupyter Notebooks
1. **Local Jupyter**:
```bash
jupyter lab
```

2. **Docker Jupyter** (with all dependencies pre-installed):
```bash
docker-compose --profile development up jupyter
```
Access at: http://localhost:8888 (token: brent-analysis-token)

3. **Available Notebooks**:
   - `notebooks/Brent_Oil_Price_Change_Point_Analysis.ipynb` - Main EDA and analysis
   - `notebooks/Bayesian_change_point_detection_using_PyMC3.ipynb` - Bayesian methods

#### API Endpoints
The backend provides RESTful API endpoints:
- `GET /api/health` - Health check
- `GET /api/data` - Oil price data
- `GET /api/events` - Market events
- `GET /api/statistics` - Statistical analysis
- `GET /api/volatility` - Volatility analysis

##  Analysis Workflow

1. **Data Loading & Preprocessing**: Import and clean historical Brent oil price data
2. **Exploratory Data Analysis**: Statistical summary and visualization
3. **Change Point Detection**: Apply algorithms to identify structural breaks
4. **Event Correlation**: Map change points to historical market events
5. **Results Interpretation**: Analyze findings and draw insights

##  Key Findings

- Identification of major structural breaks in oil price data
- Correlation between detected change points and significant market events
- Analysis of volatility patterns across different time periods
- Insights into market behavior during crisis periods

##  Methodology

The analysis employs multiple change point detection techniques:
- Statistical methods for trend analysis (PELT, Binary Segmentation, CUSUM)
- Bayesian inference for probabilistic change point detection
- Time series decomposition for pattern identification
- Cross-validation and model selection techniques


##  Configuration Management

Analysis parameters are managed through configuration files:
- `config/config.yaml`: Main configuration file
- Modify parameters without changing code
- Supports different analysis scenarios
