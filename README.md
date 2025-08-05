# Brent Oil Price Change Point Analysis

A comprehensive analysis of Brent crude oil price data to identify structural breaks and change points using statistical and machine learning techniques, featuring an interactive dashboard and containerized deployment.

##  Project Overview

This project analyzes historical Brent crude oil prices to detect significant change points that correspond to major market events. Using advanced statistical methods and Bayesian inference, we identify structural breaks in the time series data and correlate them with historical market events. The project includes a modern web dashboard for interactive data exploration and is fully containerized using Docker.

##  Objectives

- Perform exploratory data analysis on Brent oil price data
- Implement change point detection algorithms
- Correlate detected change points with major market events
- Develop insights into oil market volatility patterns
- Provide an interactive web dashboard for data visualization
- Demonstrate modern DevOps practices with Docker containerization

## Project Structure

```
├── data/
│   ├── raw/                    # Original, unmodified data files
│   ├── processed/              # Cleaned and preprocessed data
│   ├── external/               # External reference data
│   └── README.md               # Data directory documentation
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
├── src/                        # Source code modules
│   └── README.md               # Code organization guide
├── results/
│   ├── figures/                # Generated plots and visualizations
│   ├── models/                 # Saved model objects and parameters
│   └── README.md               # Results documentation
├── tests/                      # Unit tests and integration tests
│   └── test_example.py         # Example test cases
├── docs/                       # Project documentation
│   └── METHODOLOGY.md          # Detailed methodology documentation
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
  - Docker Desktop (Windows/Mac) or Docker Engine (Linux)
  - Docker Compose (usually included with Docker Desktop)

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
- Grafana: http://localhost:3001 (admin/admin)

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

For detailed methodology documentation, see [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md).

##  Testing and Quality Assurance

This project follows software engineering best practices:

- **Unit Testing**: Comprehensive test suite in `tests/` directory
- **Code Quality**: PEP 8 compliance and type hints
- **Reproducibility**: Fixed random seeds and version-controlled dependencies
- **Documentation**: Detailed docstrings and methodology documentation

Run tests with:
```bash
python -m pytest tests/
```

##  Configuration Management

Analysis parameters are managed through configuration files:
- `config/config.yaml`: Main configuration file
- Modify parameters without changing code
- Supports different analysis scenarios

## 🐳 Docker Guide for Beginners

### What is Docker?

Docker is a **containerization platform** that packages applications and their dependencies into lightweight, portable containers. Think of it as a "shipping container" for software that ensures your application runs the same way everywhere.

### Why Use Docker in This Project?

1. **Consistency**: Same environment on your laptop, server, or cloud
2. **Isolation**: Each service runs independently without conflicts
3. **Scalability**: Easy to scale individual components
4. **Deployment**: One-command deployment across environments
5. **Development**: No "it works on my machine" problems

### Docker Components in This Project

#### 1. Dockerfile
A **blueprint** that defines how to build our application container:
```dockerfile
# Uses Python 3.9 as base image
FROM python:3.9-slim

# Sets up the environment
ENV PYTHONDONTWRITEBYTECODE=1

# Installs dependencies
RUN pip install -r requirements.txt

# Runs the application
CMD ["python", "dashboard/backend/app.py"]
```

#### 2. Docker Compose
Orchestrates **multiple containers** working together:

**Services in our stack:**
- **Backend**: Flask API (Port 5000)
- **Frontend**: React app (Port 3000)
- **Redis**: Caching database (Port 6379)
- **PostgreSQL**: Main database (Port 5432)
- **Jupyter**: Analysis environment (Port 8888)
- **Nginx**: Web server/proxy (Port 80)
- **Prometheus**: Monitoring (Port 9090)
- **Grafana**: Dashboards (Port 3001)

### Docker Commands You'll Use

#### Basic Commands
```bash
# Build and start all services
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs backend

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up --build
```

#### Development Commands
```bash
# Start only development services
docker-compose --profile development up

# Start with monitoring
docker-compose --profile monitoring up

# Execute commands in running container
docker-compose exec backend bash
```

#### Useful Commands
```bash
# Remove all containers and volumes
docker-compose down -v

# View resource usage
docker stats

# Clean up unused images
docker system prune
```

### Docker Profiles Explained

Our project uses **profiles** to group services:

- **Default**: Essential services (backend, frontend, redis)
- **Development**: Adds Jupyter for analysis
- **Production**: Adds database and nginx
- **Monitoring**: Adds Prometheus and Grafana

### Volumes and Data Persistence

Docker **volumes** ensure data survives container restarts:
- `redis_data`: Cache data
- `postgres_data`: Database files
- `jupyter_data`: Notebook configurations
- `prometheus_data`: Monitoring metrics
- `grafana_data`: Dashboard configurations

### Networking

Containers communicate through a **custom network** (`brent-network`):
- Isolated from host network
- Services can reach each other by name
- Subnet: 172.20.0.0/16

### Health Checks

Docker monitors service health:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Environment Variables

Configuration through environment variables:
- `FLASK_ENV=production`
- `POSTGRES_PASSWORD=brent_password`
- `JUPYTER_TOKEN=brent-analysis-token`

### Troubleshooting Docker

**Common Issues:**

1. **Port conflicts**:
```bash
# Check what's using port 5000
netstat -ano | findstr :5000
```

2. **Permission errors**:
```bash
# Run as administrator (Windows)
# Use sudo (Linux/Mac)
```

3. **Out of disk space**:
```bash
# Clean up Docker
docker system prune -a
```

4. **Container won't start**:
```bash
# Check logs
docker-compose logs service-name
```

### Docker Best Practices Used

1. **Multi-stage builds**: Optimized image sizes
2. **Non-root user**: Security best practice
3. **Health checks**: Automatic failure detection
4. **Volume mounts**: Data persistence
5. **Environment separation**: Dev/prod configurations
6. **Resource limits**: Prevent resource exhaustion

##  Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Test with Docker: `docker-compose up --build`
6. Submit a pull request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project demonstrates professional data science workflow practices including reproducible research, comprehensive testing, modern web development, and containerized deployment with Docker.
