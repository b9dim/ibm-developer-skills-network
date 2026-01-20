# Assignment Submission Guide

## Project Overview

This Express.js backend application implements a complete online bookstore API with book search and review management features.

## Required Files

### 1. `server.js`
Main Express server file containing all API endpoints:
- GET `/books` - Get all books
- GET `/books/isbn/:isbn` - Get book by ISBN
- GET `/books/author/:author` - Get books by author
- GET `/books/title/:title` - Get books by title
- GET `/books/:isbn/review` - Get book reviews
- POST `/register` - Register new user
- POST `/login` - User login
- PUT `/books/:isbn/review` - Add/update review (authenticated)
- DELETE `/books/:isbn/review` - Delete review (authenticated)

### 2. `general.js` ⭐ **REQUIRED FOR SUBMISSION**
Contains implementations for retrieving books by:
- **ISBN**: `getBookByISBN(isbn)` - using async/await
- **Author**: `getBooksByAuthor(author)` - using async/await
- **Title**: `getBooksByTitle(title)` - using async/await

Also includes:
- Promise-based implementations
- Axios examples for API calls (async/await and Promise patterns)

**GitHub URL for general.js**: `https://github.com/YOUR_USERNAME/expressBookReview/blob/main/general.js`

### 3. `books.json`
JSON data file containing book information (ISBN, title, author, year, reviews)

### 4. `package.json`
Dependencies and project configuration

## cURL Commands for Submission

All commands are saved in `curl-commands.txt`. Here's a quick reference:

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
  -d "{\"username\":\"testuser\",\"password\":\"testpass123\"}"
```

### login
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"testpass123\"}"
```

**Important**: Save the token from the login response!

### reviewadded
```bash
curl -X PUT http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d "{\"review\":\"Amazing book! Highly recommended.\"}"
```

### deletereview
```bash
curl -X DELETE http://localhost:5000/books/978-0-123456-78-9/review \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing Steps

1. **Start the server:**
   ```bash
   cd 3
   npm install
   npm start
   ```

2. **Test each endpoint** using the cURL commands above

3. **Save outputs** for each command as specified in the assignment

4. **Submit the GitHub URL** of your `general.js` file

## Notes

- Make sure to replace `YOUR_USERNAME` with your actual GitHub username
- Replace `YOUR_TOKEN_HERE` with the actual JWT token from login
- The server runs on port 5000 by default
- All book data is stored in `books.json`
- User data is stored in-memory (resets on server restart)

## Features Implemented

✅ Retrieve list of all available books
✅ Search books by ISBN
✅ Search books by author name
✅ Search books by title
✅ Access reviews for specific books
✅ Register as new user
✅ Login to account
✅ Add reviews for books
✅ Update reviews for books
✅ Delete reviews for books
✅ Concurrent access handling (JWT authentication)
✅ general.js with Promise/async-await and Axios
