#!/bin/bash

# Test script for Adʿiyah Backend
# Make sure the server is running first: npm start

BASE_URL="http://localhost:3000"

echo "🧪 Testing Adʿiyah Backend"
echo "=========================="
echo ""

# Test 1: Health check
echo "1️⃣  Testing health endpoint..."
curl -s "$BASE_URL/health" | jq '.' || echo "Response: $(curl -s $BASE_URL/health)"
echo ""
echo ""

# Test 2: Valid submission
echo "2️⃣  Testing valid submission..."
curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "dua": "اللهم بارك لي في هذا اليوم",
    "honey": ""
  }' | jq '.' || curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "dua": "اللهم بارك لي في هذا اليوم",
    "honey": ""
  }'
echo ""
echo ""

# Test 3: Submission without name (should work)
echo "3️⃣  Testing submission without name..."
curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "dua": "اللهم اغفر لي وارحمني",
    "honey": ""
  }' | jq '.' || curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "dua": "اللهم اغفر لي وارحمني",
    "honey": ""
  }'
echo ""
echo ""

# Test 4: Missing dua (should fail)
echo "4️⃣  Testing missing dua (should fail)..."
curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "honey": ""
  }' | jq '.' || curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "honey": ""
  }'
echo ""
echo ""

# Test 5: Honeypot filled (should fail)
echo "5️⃣  Testing honeypot filled (should fail)..."
curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bot",
    "dua": "Spam message",
    "honey": "filled"
  }' | jq '.' || curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bot",
    "dua": "Spam message",
    "honey": "filled"
  }'
echo ""
echo ""

# Test 6: Rate limiting (should fail on second request)
echo "6️⃣  Testing rate limiting (second request should fail)..."
echo "First request:"
curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "dua": "Test rate limit",
    "honey": ""
  }' | jq '.' || curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "dua": "Test rate limit",
    "honey": ""
  }'
echo ""
echo "Second request (immediately after, should be rate limited):"
curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "dua": "Test rate limit again",
    "honey": ""
  }' | jq '.' || curl -s -X POST "$BASE_URL/submit-dua" \
  -H "Content-Type: application/json" \
  -d '{
    "dua": "Test rate limit again",
    "honey": ""
  }'
echo ""
echo ""

echo "✅ Testing complete!"
