#!/bin/bash

# Set the script to exit if any command fails
set -e

# Navigate to the directory where the script is located (i.e., the root of the url-shortener project)
cd "$(dirname "$0")"

# Start the CORS Anywhere proxy server in the background
echo "Starting CORS Anywhere proxy server..."
cd cors-anywhere
node server.js &
PROXY_PID=$!
cd ..

# Check if node_modules directory exists; if not, run npm install
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm install..."
  npm install
fi

# Start the Angular development server
echo "Starting Angular development server..."
npx ng serve --open

# When the Angular server stops, stop the CORS Anywhere proxy server
echo "Stopping CORS Anywhere proxy server..."
kill $PROXY_PID
