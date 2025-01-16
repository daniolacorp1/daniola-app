#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Running pre-deployment checks..."

# Check Node.js version
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"
if [[ ! $NODE_VERSION =~ ^v18 ]]; then
  echo "${RED}❌ Node.js version must be 18.x${NC}"
  exit 1
fi

# Check npm version
NPM_VERSION=$(npm -v)
echo "npm version: $NPM_VERSION"
if [[ ! $NPM_VERSION =~ ^9 ]]; then
  echo "${RED}❌ npm version must be 9.x${NC}"
  exit 1
fi

# Check for required files
REQUIRED_FILES=("package.json" "vite.config.ts" "index.html" "tsconfig.json")
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "${RED}❌ Missing required file: $file${NC}"
    exit 1
  fi
done

# Check for environment variables
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
  echo "${RED}❌ Missing required environment variables${NC}"
  exit 1
fi

# Try building the project
echo "${YELLOW}📦 Testing build...${NC}"
npm run build

if [ $? -eq 0 ]; then
  echo "${GREEN}✅ Build successful${NC}"
else
  echo "${RED}❌ Build failed${NC}"
  exit 1
fi

echo "${GREEN}✅ All checks passed${NC}" 