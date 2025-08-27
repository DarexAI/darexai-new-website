#!/bin/bash

# Build script for Vercel deployment
echo "Starting build process..."

# Clean previous builds
echo "Cleaning previous build artifacts..."
rm -rf dist

# Check Node version
node_version=$(node -v)
echo "Node version: $node_version"

# Install dependencies with optimized settings
echo "Installing dependencies..."
npm ci --prefer-offline --no-audit --no-fund

# Run the build
echo "Building application..."
npm run build

echo "Build completed successfully!"