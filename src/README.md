# Source Code Directory

This directory contains all source code modules for the Brent Oil Price Change Point Analysis project.

## Recommended Structure

```
src/
├── data/
│   ├── __init__.py
│   ├── data_loader.py      # Data loading utilities
│   └── preprocessor.py     # Data preprocessing functions
├── models/
│   ├── __init__.py
│   ├── change_point.py     # Change point detection algorithms
│   └── bayesian_models.py  # Bayesian inference models
├── visualization/
│   ├── __init__.py
│   ├── plots.py           # Plotting utilities
│   └── dashboard.py       # Interactive visualizations
├── utils/
│   ├── __init__.py
│   ├── helpers.py         # General utility functions
│   └── config.py          # Configuration management
└── analysis/
    ├── __init__.py
    ├── eda.py             # Exploratory data analysis
    └── statistical_tests.py # Statistical testing functions
```

## Guidelines

- Each module should have a clear, single responsibility
- Include docstrings for all functions and classes
- Follow PEP 8 style guidelines
- Add type hints where appropriate
- Include unit tests in the `tests/` directory

## Usage

Import modules in notebooks using:
```python
from src.data.data_loader import load_brent_data
from src.models.change_point import detect_change_points
```