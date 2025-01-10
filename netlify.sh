#!/bin/bash
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Installing dependencies..."
npm install
echo "Building..."
npm run build 