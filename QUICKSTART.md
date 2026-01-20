# Quick Start Guide

## Setup Instructions

1. **Navigate to the project directory:**
   ```bash
   cd 3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`

## Testing the API

### Step 1: Get All Books
```bash
curl http://localhost:5000/books
```

### Step 2: Register a User
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"testpass123\"}"
```

### Step 3: Login and Get Token
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"testpass123\"}"
```

Copy the token from the response.

### Step 4: Add a Review (replace YOUR_TOKEN_HERE with actual token)
```bash
curl -X PUT http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"review\":\"Great book!\"}"
```

### Step 5: View Reviews
```bash
curl http://localhost:5000/books/978-0-123456-78-9/review
```

### Step 6: Delete Review
```bash
curl -X DELETE http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Assignment Checklist

- [x] Get all books endpoint
- [x] Get books by ISBN endpoint
- [x] Get books by author endpoint
- [x] Get books by title endpoint
- [x] Get book reviews endpoint
- [x] User registration endpoint
- [x] User login endpoint
- [x] Add/update review endpoint (authenticated)
- [x] Delete review endpoint (authenticated)
- [x] general.js with Promise/async-await and Axios

## Files Structure

- `server.js` - Main Express server with all routes
- `general.js` - Book retrieval functions using async/await and Axios
- `books.json` - Book data source
- `package.json` - Dependencies
- `curl-commands.txt` - All cURL commands for assignment submission
