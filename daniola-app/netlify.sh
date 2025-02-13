#!/bin/bash

# Print debug information
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Current working directory: $(pwd)"
echo "Environment variables:"
env | grep -i REACT_ || true
env | grep -i NEXT_ || true
env | grep -i VITE_ || true

# Ensure required environment variables are set
if [ -f .env ]; then
  echo "Loading .env file..."
  export $(cat .env | xargs)
fi

echo "Installing dependencies..."
npm install

echo "Cleaning cache..."
npm cache clean --force
rm -rf .next || true
rm -rf node_modules/.cache || true

echo "Building..."
npm run build

echo "Build completed"