#!/bin/bash

# Azel Tech Deployment Script
# This script prepares the project for deployment to the server

echo "🚀 Starting deployment preparation..."

# Build frontend
echo "📦 Building frontend..."
npm run build

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p public/uploads
mkdir -p public/cvs
mkdir -p logs

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 public
chmod -R 755 logs

echo "✅ Deployment preparation completed!"
echo ""
echo "Next steps:"
echo "1. Upload all files to server via FTP"
echo "2. SSH into server and run:"
echo "   - cd /path/to/project"
echo "   - npm install --production"
echo "   - npx prisma migrate deploy"
echo "   - pm2 start ecosystem.config.js"
echo "   - pm2 save"

