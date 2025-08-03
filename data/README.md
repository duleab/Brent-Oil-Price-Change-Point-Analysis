# Data Directory

This directory contains all data files used in the Brent Oil Price Change Point Analysis project.

## Structure

- **raw/**: Original, unmodified data files
  - Store raw Brent oil price datasets
  - Historical market event data
  - External economic indicators

- **processed/**: Cleaned and preprocessed data
  - Cleaned oil price time series
  - Feature-engineered datasets
  - Merged datasets ready for analysis

- **external/**: External reference data
  - Market event calendars
  - Economic indicators from external sources
  - Supplementary datasets for correlation analysis

## Data Sources

- Brent crude oil price data
- Historical market events
- Economic indicators

## Usage

1. Place raw data files in the `raw/` subdirectory
2. Use preprocessing scripts to generate cleaned data in `processed/`
3. Store external reference data in `external/`

**Note**: Large data files are excluded from version control via .gitignore