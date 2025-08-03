# Results Directory

This directory contains all outputs generated from the Brent Oil Price Change Point Analysis.

## Structure

- **figures/**: All visualizations and plots
  - Time series plots
  - Change point detection visualizations
  - Statistical analysis charts
  - Correlation plots
  - Export formats: PNG, SVG, PDF

- **models/**: Saved model objects and parameters
  - Trained change point detection models
  - Bayesian model traces and summaries
  - Model performance metrics
  - Serialized model objects (pickle, joblib)

## File Naming Conventions

### Figures
- `01_eda_oil_prices_timeseries.png`
- `02_changepoint_detection_results.png`
- `03_bayesian_posterior_analysis.png`
- `04_event_correlation_heatmap.png`

### Models
- `changepoint_model_YYYYMMDD.pkl`
- `bayesian_trace_YYYYMMDD.nc`
- `model_performance_metrics.json`

## Usage

- Figures are referenced in notebooks and reports
- Models can be loaded for further analysis or deployment
- All results are version-controlled except large model files

## Notes

- Large model files (>100MB) are excluded via .gitignore
- Use consistent naming for reproducibility
- Include metadata files describing model parameters