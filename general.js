const axios = require('axios');
const fs = require('fs').promises;

// Using async/await with Axios
async function getBooks() {
    try {
        const data = await fs.readFile('books.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading books: ${error.message}`);
    }
}

// Get books by ISBN using async/await
async function getBookByISBN(isbn) {
    try {
        const books = await getBooks();
        const book = books.find(b => b.isbn === isbn);
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }
        return book;
    } catch (error) {
        throw new Error(`Error retrieving book by ISBN: ${error.message}`);
    }
}

// Get books by author using async/await
async function getBooksByAuthor(author) {
    try {
        const books = await getBooks();
        const filteredBooks = books.filter(b => 
            b.author.toLowerCase().includes(author.toLowerCase())
        );
        if (filteredBooks.length === 0) {
            throw new Error(`No books found by author: ${author}`);
        }
        return filteredBooks;
    } catch (error) {
        throw new Error(`Error retrieving books by author: ${error.message}`);
    }
}

// Get books by title using async/await
async function getBooksByTitle(title) {
    try {
        const books = await getBooks();
        const filteredBooks = books.filter(b => 
            b.title.toLowerCase().includes(title.toLowerCase())
        );
        if (filteredBooks.length === 0) {
            throw new Error(`No books found with title: ${title}`);
        }
        return filteredBooks;
    } catch (error) {
        throw new Error(`Error retrieving books by title: ${error.message}`);
    }
}

// Alternative implementation using Promise callbacks with Axios (for external API calls)
function getBooksByISBNPromise(isbn) {
    return new Promise((resolve, reject) => {
        fs.readFile('books.json', 'utf8')
            .then(data => {
                const books = JSON.parse(data);
                const book = books.find(b => b.isbn === isbn);
                if (book) {
                    resolve(book);
                } else {
                    reject(new Error(`Book with ISBN ${isbn} not found`));
                }
            })
            .catch(error => reject(error));
    });
}

function getBooksByAuthorPromise(author) {
    return new Promise((resolve, reject) => {
        fs.readFile('books.json', 'utf8')
            .then(data => {
                const books = JSON.parse(data);
                const filteredBooks = books.filter(b => 
                    b.author.toLowerCase().includes(author.toLowerCase())
                );
                if (filteredBooks.length > 0) {
                    resolve(filteredBooks);
                } else {
                    reject(new Error(`No books found by author: ${author}`));
                }
            })
            .catch(error => reject(error));
    });
}

function getBooksByTitlePromise(title) {
    return new Promise((resolve, reject) => {
        fs.readFile('books.json', 'utf8')
            .then(data => {
                const books = JSON.parse(data);
                const filteredBooks = books.filter(b => 
                    b.title.toLowerCase().includes(title.toLowerCase())
                );
                if (filteredBooks.length > 0) {
                    resolve(filteredBooks);
                } else {
                    reject(new Error(`No books found with title: ${title}`));
                }
            })
            .catch(error => reject(error));
    });
}

// Alternative implementation using Axios for API calls (async/await)
// This demonstrates how to use Axios with async/await for HTTP requests
async function getBooksByISBNAxios(isbn, apiUrl = 'http://localhost:5000') {
    try {
        const response = await axios.get(`${apiUrl}/books/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        throw new Error(`API Error retrieving book by ISBN: ${error.message}`);
    }
}

async function getBooksByAuthorAxios(author, apiUrl = 'http://localhost:5000') {
    try {
        const response = await axios.get(`${apiUrl}/books/author/${encodeURIComponent(author)}`);
        return response.data;
    } catch (error) {
        throw new Error(`API Error retrieving books by author: ${error.message}`);
    }
}

async function getBooksByTitleAxios(title, apiUrl = 'http://localhost:5000') {
    try {
        const response = await axios.get(`${apiUrl}/books/title/${encodeURIComponent(title)}`);
        return response.data;
    } catch (error) {
        throw new Error(`API Error retrieving books by title: ${error.message}`);
    }
}

// Example using Axios with Promise callbacks (alternative pattern)
function getBooksByISBNAxiosPromise(isbn, apiUrl = 'http://localhost:5000') {
    return axios.get(`${apiUrl}/books/isbn/${isbn}`)
        .then(response => response.data)
        .catch(error => {
            throw new Error(`API Error: ${error.message}`);
        });
}

module.exports = {
    getBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBooksByISBNPromise,
    getBooksByAuthorPromise,
    getBooksByTitlePromise,
    getBooksByISBNAxios,
    getBooksByAuthorAxios,
    getBooksByTitleAxios,
    getBooksByISBNAxiosPromise
};
