#!/bin/bash

# Test Vercel Deployment Script
# Usage: ./test-vercel-deployment.sh <your-vercel-url>
# Example: ./test-vercel-deployment.sh https://your-app.vercel.app

if [ -z "$1" ]; then
    echo "❌ Error: Please provide your Vercel deployment URL"
    echo "Usage: ./test-vercel-deployment.sh <your-vercel-url>"
    echo "Example: ./test-vercel-deployment.sh https://your-app.vercel.app"
    exit 1
fi

BASE_URL=$1
# Remove trailing slash if present
BASE_URL=${BASE_URL%/}

echo "🧪 Testing Vercel Deployment: $BASE_URL"
echo "================================================"
echo ""

# Test 1: Health Check
echo "📍 Test 1: Health Check Endpoint"
echo "URL: $BASE_URL/health-check"
RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/health-check")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health check passed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
else
    echo "❌ Health check failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
fi
echo ""

# Test 2: Root endpoint (API Documentation)
echo "📍 Test 2: API Documentation Endpoint"
echo "URL: $BASE_URL/"
RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ API documentation endpoint accessible (HTTP $HTTP_CODE)"
else
    echo "❌ API documentation endpoint failed (HTTP $HTTP_CODE)"
fi
echo ""

# Test 3: Users endpoint
echo "📍 Test 3: Users API Endpoint"
echo "URL: $BASE_URL/users"
RESPONSE=$(curl -s -w "\n%{http_code}" "$BASE_URL/users")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Users endpoint passed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
else
    echo "❌ Users endpoint failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
fi
echo ""

# Test 4: CORS headers
echo "📍 Test 4: CORS Configuration"
echo "URL: $BASE_URL/health-check"
CORS_HEADER=$(curl -s -I -X OPTIONS "$BASE_URL/health-check" | grep -i "access-control-allow-origin")

if [ ! -z "$CORS_HEADER" ]; then
    echo "✅ CORS headers present"
    echo "$CORS_HEADER"
else
    echo "⚠️  No CORS headers detected (may need to configure CORS_ORIGIN env variable)"
fi
echo ""

echo "================================================"
echo "🏁 Testing complete!"
echo ""
echo "📝 Next Steps:"
echo "   1. If health check passed: Your deployment is working! ✅"
echo "   2. If you see CORS errors: Set CORS_ORIGIN environment variable in Vercel"
echo "   3. View full API documentation at: $BASE_URL/"
echo ""
