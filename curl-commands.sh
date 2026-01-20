#!/bin/bash

# Express Book Review API - cURL Commands
# Make sure the server is running on http://localhost:5000

BASE_URL="http://localhost:5000"

echo "=== Get All Books ==="
curl -X GET "${BASE_URL}/books"
echo -e "\n\n"

echo "=== Get Book by ISBN ==="
curl -X GET "${BASE_URL}/books/isbn/978-0-123456-78-9"
echo -e "\n\n"

echo "=== Get Books by Author ==="
curl -X GET "${BASE_URL}/books/author/George%20Orwell"
echo -e "\n\n"

echo "=== Get Books by Title ==="
curl -X GET "${BASE_URL}/books/title/The%20Great%20Gatsby"
echo -e "\n\n"

echo "=== Get Book Review ==="
curl -X GET "${BASE_URL}/books/978-0-123456-78-9/review"
echo -e "\n\n"

echo "=== Register User ==="
curl -X POST "${BASE_URL}/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
echo -e "\n\n"

echo "=== Login ==="
TOKEN=$(curl -s -X POST "${BASE_URL}/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"
echo -e "\n\n"

echo "=== Add/Update Review ==="
curl -X PUT "${BASE_URL}/books/978-0-123456-78-9/review" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{"review":"This is an excellent book! Highly recommended."}'
echo -e "\n\n"

echo "=== Delete Review ==="
curl -X DELETE "${BASE_URL}/books/978-0-123456-78-9/review" \
  -H "Authorization: Bearer ${TOKEN}"
echo -e "\n\n"
