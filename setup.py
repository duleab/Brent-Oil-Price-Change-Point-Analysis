#!/usr/bin/env python3
"""
Setup script for Brent Oil Price Change Point Analysis project.

This script automates the setup process for the project environment.
"""

import os
import sys
import subprocess
from pathlib import Path

def create_directories():
    """Create necessary project directories if they don't exist."""
    directories = [
        "data/raw",
        "data/processed", 
        "data/external",
        "results/figures",
        "results/models",
        "logs",
        "docs",
        "tests"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✓ Created directory: {directory}")

def install_requirements():
    """Install required Python packages."""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✓ Successfully installed requirements")
    except subprocess.CalledProcessError as e:
        print(f"✗ Error installing requirements: {e}")
        return False
    return True

def setup_jupyter_kernel():
    """Setup Jupyter kernel for the project."""
    try:
        subprocess.check_call([sys.executable, "-m", "ipykernel", "install", "--user", "--name", "brent-analysis"])
        print("✓ Jupyter kernel 'brent-analysis' installed")
    except subprocess.CalledProcessError as e:
        print(f"✗ Error setting up Jupyter kernel: {e}")

def main():
    """Main setup function."""
    print("🚀 Setting up Brent Oil Price Change Point Analysis project...\n")
    
    # Create directories
    print("📁 Creating project directories...")
    create_directories()
    print()
    
    # Install requirements
    print("📦 Installing Python packages...")
    if install_requirements():
        print()
        
        # Setup Jupyter kernel
        print("🔧 Setting up Jupyter kernel...")
        setup_jupyter_kernel()
        print()
        
        print("✅ Setup completed successfully!")
        print("\n📋 Next steps:")
        print("1. Place your data files in the 'data/raw/' directory")
        print("2. Launch Jupyter: jupyter lab")
        print("3. Open the analysis notebooks in 'notebooks/'")
        print("4. Select the 'brent-analysis' kernel when running notebooks")
    else:
        print("❌ Setup failed. Please check the error messages above.")

if __name__ == "__main__":
    main()