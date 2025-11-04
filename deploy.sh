#!/bin/bash

# Deployment script for Express Server on Azure
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin copilot/add-server-blocknote-processing

# Stop and remove old containers
echo "🛑 Stopping old containers..."
docker compose down

# Remove old images to ensure fresh build
echo "🗑️  Removing old images..."
docker compose down --rmi all || true

# Build new image
echo "🔨 Building new Docker image..."
docker compose build --no-cache

# Start services
echo "🚀 Starting services..."
docker compose up -d

# Wait for health check
echo "⏳ Waiting for health check..."
sleep 10

# Check if service is healthy
echo "🔍 Checking service health..."
docker compose ps

# Show logs
echo "📝 Recent logs:"
docker compose logs --tail=50

echo "✅ Deployment complete!"
echo "🌐 Server is running on http://$(hostname -I | awk '{print $1}'):8080"
