const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const { getBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle } = require('./general');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for users (in production, use a database)
let users = [];

// Helper function to read books
async function readBooks() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'books.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading books:', error);
        return [];
    }
}

// Helper function to write books
async function writeBooks(books) {
    try {
        await fs.writeFile(path.join(__dirname, 'books.json'), JSON.stringify(books, null, 2));
    } catch (error) {
        console.error('Error writing books:', error);
    }
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book by ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
    try {
        const book = await getBookByISBN(req.params.isbn);
        res.json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get books by author
app.get('/books/author/:author', async (req, res) => {
    try {
        const author = decodeURIComponent(req.params.author);
        const books = await getBooksByAuthor(author);
        res.json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get books by title
app.get('/books/title/:title', async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
        const books = await getBooksByTitle(title);
        res.json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get reviews for a specific book
app.get('/books/:isbn/review', async (req, res) => {
    try {
        const books = await readBooks();
        const book = books.find(b => b.isbn === req.params.isbn);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json({ isbn: book.isbn, reviews: book.reviews || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if user already exists
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            username,
            password: hashedPassword
        };

        users.push(user);

        res.status(201).json({ 
            message: 'User registered successfully',
            username: username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ 
            message: 'Login successful',
            token: token,
            username: username
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add or update a review (requires authentication)
app.put('/books/:isbn/review', authenticateToken, async (req, res) => {
    try {
        const { review } = req.body;
        const { isbn } = req.params;
        const username = req.user.username;

        if (!review) {
            return res.status(400).json({ message: 'Review text is required' });
        }

        const books = await readBooks();
        const bookIndex = books.findIndex(b => b.isbn === isbn);

        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Initialize reviews array if it doesn't exist
        if (!books[bookIndex].reviews) {
            books[bookIndex].reviews = [];
        }

        // Check if user already has a review
        const existingReviewIndex = books[bookIndex].reviews.findIndex(r => r.username === username);

        if (existingReviewIndex !== -1) {
            // Update existing review
            books[bookIndex].reviews[existingReviewIndex].review = review;
            books[bookIndex].reviews[existingReviewIndex].date = new Date().toISOString();
        } else {
            // Add new review
            books[bookIndex].reviews.push({
                username: username,
                review: review,
                date: new Date().toISOString()
            });
        }

        await writeBooks(books);

        res.json({ 
            message: existingReviewIndex !== -1 ? 'Review updated successfully' : 'Review added successfully',
            isbn: isbn,
            reviews: books[bookIndex].reviews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a review (requires authentication)
app.delete('/books/:isbn/review', authenticateToken, async (req, res) => {
    try {
        const { isbn } = req.params;
        const username = req.user.username;

        const books = await readBooks();
        const bookIndex = books.findIndex(b => b.isbn === isbn);

        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (!books[bookIndex].reviews) {
            return res.status(404).json({ message: 'No reviews found for this book' });
        }

        // Find and remove user's review
        const reviewIndex = books[bookIndex].reviews.findIndex(r => r.username === username);

        if (reviewIndex === -1) {
            return res.status(404).json({ message: 'Review not found' });
        }

        books[bookIndex].reviews.splice(reviewIndex, 1);
        await writeBooks(books);

        res.json({ 
            message: 'Review deleted successfully',
            isbn: isbn,
            reviews: books[bookIndex].reviews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Express Book Review API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
