# Methodology Documentation

## Brent Oil Price Change Point Analysis

### Overview

This document outlines the comprehensive methodology used for detecting change points in Brent crude oil price time series data and correlating them with major market events.

### 1. Data Collection and Preprocessing

#### 1.1 Data Sources
- **Primary Data**: Historical Brent crude oil prices (daily/weekly frequency)
- **Secondary Data**: Major market events, economic indicators
- **External Data**: Geopolitical events, supply/demand factors

#### 1.2 Data Quality Assessment
- Missing value analysis and imputation strategies
- Outlier detection using statistical methods
- Data consistency checks across different sources
- Temporal alignment of datasets

#### 1.3 Preprocessing Steps
1. **Data Cleaning**: Remove duplicates, handle missing values
2. **Normalization**: Log transformation for price stability
3. **Feature Engineering**: Create derived features (returns, volatility)
4. **Temporal Alignment**: Synchronize different data frequencies

### 2. Exploratory Data Analysis (EDA)

#### 2.1 Descriptive Statistics
- Central tendency measures (mean, median, mode)
- Dispersion measures (variance, standard deviation)
- Distribution analysis (skewness, kurtosis)
- Temporal patterns and seasonality

#### 2.2 Visualization Techniques
- Time series plots with trend analysis
- Distribution histograms and box plots
- Correlation matrices and heatmaps
- Rolling statistics visualization

#### 2.3 Stationarity Testing
- Augmented Dickey-Fuller (ADF) test
- Kwiatkowski-Phillips-Schmidt-Shin (KPSS) test
- Phillips-Perron test
- Differencing strategies for non-stationary series

### 3. Change Point Detection Methods

#### 3.1 Statistical Methods

##### 3.1.1 CUSUM (Cumulative Sum) Method
- **Principle**: Detects changes in mean of time series
- **Implementation**: Sequential analysis of cumulative deviations
- **Parameters**: Threshold values, reference mean
- **Advantages**: Real-time detection capability
- **Limitations**: Assumes known change magnitude

##### 3.1.2 PELT (Pruned Exact Linear Time)
- **Principle**: Optimal segmentation with linear time complexity
- **Implementation**: Dynamic programming with pruning
- **Parameters**: Penalty parameter, minimum segment length
- **Advantages**: Exact solution, computationally efficient
- **Limitations**: Requires penalty parameter tuning

##### 3.1.3 Binary Segmentation
- **Principle**: Recursive splitting of time series
- **Implementation**: Iterative identification of most significant change
- **Parameters**: Number of change points, significance threshold
- **Advantages**: Simple implementation, interpretable results
- **Limitations**: May miss multiple simultaneous changes

#### 3.2 Bayesian Methods

##### 3.2.1 Bayesian Change Point Detection
- **Framework**: PyMC probabilistic programming
- **Model Specification**:
  ```
  τ ~ Uniform(0, T)  # Change point location
  μ₁ ~ Normal(0, σ²)  # Mean before change point
  μ₂ ~ Normal(0, σ²)  # Mean after change point
  σ ~ HalfNormal(1)   # Standard deviation
  ```
- **Inference**: Markov Chain Monte Carlo (MCMC) sampling
- **Output**: Posterior distributions of change point locations

##### 3.2.2 Multiple Change Point Model
- **Extension**: Handling multiple change points
- **Prior Specification**: Poisson process for change point counts
- **Model Comparison**: Bayes factors, information criteria

### 4. Model Validation and Selection

#### 4.1 Cross-Validation Strategies
- **Time Series Cross-Validation**: Expanding window approach
- **Blocked Cross-Validation**: Respect temporal dependencies
- **Out-of-Sample Testing**: Hold-out validation periods

#### 4.2 Performance Metrics
- **Detection Accuracy**: True positive rate, false positive rate
- **Temporal Precision**: Distance between detected and actual change points
- **Model Comparison**: AIC, BIC, DIC for Bayesian models

#### 4.3 Sensitivity Analysis
- **Parameter Sensitivity**: Robustness to hyperparameter choices
- **Data Sensitivity**: Impact of data preprocessing decisions
- **Method Comparison**: Comparative analysis across algorithms

### 5. Event Correlation Analysis

#### 5.1 Historical Event Mapping
- **Event Database**: Compilation of major market events
- **Temporal Matching**: Alignment with detected change points
- **Significance Testing**: Statistical tests for correlation

#### 5.2 Causal Inference
- **Granger Causality**: Testing directional relationships
- **Event Study Methodology**: Impact assessment framework
- **Confounding Control**: Multiple variable analysis

### 6. Results Interpretation

#### 6.1 Statistical Significance
- **Confidence Intervals**: Uncertainty quantification
- **Hypothesis Testing**: Formal statistical tests
- **Multiple Testing Correction**: Bonferroni, FDR adjustments

#### 6.2 Economic Interpretation
- **Market Context**: Economic significance of findings
- **Policy Implications**: Regulatory and investment insights
- **Risk Assessment**: Volatility and stability analysis

### 7. Reproducibility Framework

#### 7.1 Code Organization
- **Modular Design**: Separate functions for each analysis step
- **Version Control**: Git-based tracking of changes
- **Documentation**: Comprehensive code comments and docstrings

#### 7.2 Environment Management
- **Dependency Specification**: requirements.txt with versions
- **Configuration Management**: YAML-based parameter files
- **Containerization**: Docker for environment isolation

#### 7.3 Data Provenance
- **Data Lineage**: Tracking data transformations
- **Metadata Management**: Comprehensive data documentation
- **Audit Trail**: Logging of analysis steps

### 8. Limitations and Future Work

#### 8.1 Current Limitations
- **Model Assumptions**: Stationarity requirements
- **Data Quality**: Dependency on historical accuracy
- **Computational Complexity**: Scalability considerations

#### 8.2 Future Enhancements
- **Real-time Detection**: Streaming data processing
- **Machine Learning Integration**: Deep learning approaches
- **Multi-variate Analysis**: Incorporating multiple time series

### References

1. Killick, R., & Eckley, I. (2014). changepoint: An R package for changepoint analysis.
2. Salvatier, J., Wiecki, T. V., & Fonnesbeck, C. (2016). Probabilistic programming in Python using PyMC3.
3. Truong, C., Oudre, L., & Vayatis, N. (2020). Selective review of offline change point detection methods.
4. Adams, R. P., & MacKay, D. J. (2007). Bayesian online changepoint detection.