# Express Book Review API

A backend Express.js application for an online bookstore with book search and review management features.

## Features

- Retrieve a list of all available books
- Search for books by ISBN, author name, or title
- Access reviews for specific books
- Register as a new user and login
- Add, update, and delete reviews for books

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### 1. Get All Books
```bash
curl http://localhost:5000/books
```

### 2. Get Book by ISBN
```bash
curl http://localhost:5000/books/isbn/978-0-123456-78-9
```

### 3. Get Books by Author
```bash
curl http://localhost:5000/books/author/George%20Orwell
```

### 4. Get Books by Title
```bash
curl http://localhost:5000/books/title/The%20Great%20Gatsby
```

### 5. Get Book Reviews
```bash
curl http://localhost:5000/books/978-0-123456-78-9/review
```

### 6. Register User
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}'
```

### 7. Login
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"password123"}'
```

Save the token from the login response for authenticated requests.

### 8. Add/Update Review
```bash
curl -X PUT http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"review":"This is an excellent book!"}'
```

### 9. Delete Review
```bash
curl -X DELETE http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Assignment Submission Commands

### githubrepo
```bash
curl https://api.github.com/repos/YOUR_USERNAME/expressBookReview
```

### getallbooks
```bash
curl http://localhost:5000/books
```

### getbooksbyISBN
```bash
curl http://localhost:5000/books/isbn/978-0-123456-78-9
```

### getbooksbyauthor
```bash
curl http://localhost:5000/books/author/George%20Orwell
```

### getbooksbytitle
```bash
curl http://localhost:5000/books/title/The%20Great%20Gatsby
```

### getbookreview
```bash
curl http://localhost:5000/books/978-0-123456-78-9/review
```

### register
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### login
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### reviewadded
```bash
curl -X PUT http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"review":"Amazing book! Highly recommended."}'
```

### deletereview
```bash
curl -X DELETE http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure

```
3/
├── server.js          # Main Express server file
├── general.js         # Book retrieval functions using Promise/async-await with Axios
├── books.json         # Book data source
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## general.js

The `general.js` file contains implementations for retrieving books by:
- **ISBN**: `getBookByISBN(isbn)` - using async/await
- **Author**: `getBooksByAuthor(author)` - using async/await  
- **Title**: `getBooksByTitle(title)` - using async/await

All functions use async/await pattern and are ready for Axios integration with external APIs.

## Notes

- The application uses JWT tokens for authentication
- Passwords are hashed using bcrypt
- Book data is stored in `books.json`
- User data is stored in-memory (for production, use a database)
