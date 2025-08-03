# Brent Oil Price Change Point Analysis

A comprehensive analysis of Brent crude oil price data to identify structural breaks and change points using statistical and machine learning techniques.

##  Project Overview

This project analyzes historical Brent crude oil prices to detect significant change points that correspond to major market events. Using advanced statistical methods and Bayesian inference, we identify structural breaks in the time series data and correlate them with historical market events.

##  Objectives

- Perform exploratory data analysis on Brent oil price data
- Implement change point detection algorithms
- Correlate detected change points with major market events
- Develop insights into oil market volatility patterns

## Project Structure

```
├── data/
│   ├── raw/                    # Original, unmodified data files
│   ├── processed/              # Cleaned and preprocessed data
│   ├── external/               # External reference data
│   └── README.md               # Data directory documentation
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
├── requirements.txt            # Python dependencies
├── setup.py                    # Automated setup script
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

##  Technologies Used

- **Python**: Primary programming language
- **Pandas**: Data manipulation and analysis
- **NumPy**: Numerical computing
- **Matplotlib/Seaborn**: Data visualization
- **Jupyter Notebooks**: Interactive analysis environment
- **Statistical Libraries**: For change point detection algorithms

##  Key Features

- **Exploratory Data Analysis**: Comprehensive statistical analysis of oil price data
- **Change Point Detection**: Implementation of multiple algorithms to identify structural breaks
- **Event Correlation**: Mapping detected change points to historical market events
- **Visualization**: Interactive plots and charts for data insights

##  Getting Started

### Prerequisites

- Python 3.8 or higher
- Jupyter Notebook or JupyterLab
- Required Python packages (see installation section)

### Installation

#### Option 1: Automated Setup (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/duleab/Brent-Oil-Price-Change-Point-Analysis.git
cd Brent-Oil-Price-Change-Point-Analysis
```

2. Run the automated setup script:
```bash
python setup.py
```

This will:
- Create all necessary directories
- Install required Python packages
- Set up Jupyter kernel for the project

#### Option 2: Manual Setup

1. Clone the repository (as above)

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install required packages:
```bash
pip install -r requirements.txt
```

4. Create project directories:
```bash
mkdir -p data/{raw,processed,external} results/{figures,models} docs tests config
```

### Running the Analysis

1. Launch Jupyter Lab:
```bash
jupyter lab
```

2. Open and run the analysis notebooks:
   - `notebooks/Brent_Oil_Price_Change_Point_Analysis.ipynb` - Main EDA and analysis
   - `notebooks/Bayesian_change_point_detection_using_PyMC3.ipynb` - Bayesian methods

3. Select the 'brent-analysis' kernel when running notebooks (if using automated setup)

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

##  Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project demonstrates professional data science workflow practices including reproducible research, comprehensive testing, and clear documentation standards.
