import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPath = '/tmp/books.db';

export const setUpDatabase = () =>{
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    }).then(db =>{
        return db.exec(`
            CREATE TABLE IF NOT EXISTS books(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            bookTitle TEXT,
            bookAuthor TEXT,
            bookPrice DOUBLE,
            bookGenre TEXT,
            imageLink TEXT
            )`
        ).then(()=>{
            return db.get(`SELECT COUNT(*) as count FROM books`);
        }).then((result)=>{
            if(result.count === 0){
                return db.run(`
                INSERT INTO books(bookTitle, bookAuthor, bookPrice, bookGenre, imageLink)
                VALUES
                ('To Kill a Mockingbird', 'Harper Lee', 14.99, 'Classic Fiction', 'mockingbird.jpg'),
                ('1984', 'George Orwell', 11.99, 'Dystopian', '1984.jpg'),
                ('The Great Gatsby', 'F. Scott Fitzgerald', 10.50, 'Classic Fiction', 'greatGatsby.jpg'),
                ('Pride and Prejudice', 'Jane Austen', 9.99, 'Romance', 'pride.jpg'),
                ('The Hobbit', 'J.R.R. Tolkien', 15.25, 'Fantasy', 'hobbit.jpg'),
                ('The Catcher in the Rye', 'J.D. Salinger', 12.50, 'Coming-of-Age', 'catcher.jpg'),
                ('Brave New World', 'Aldous Huxley', 13.75, 'Dystopian', 'bravenewworld.jpg'),
                ('Fahrenheit 451', 'Ray Bradbury', 11.25, 'Science Fiction', 'fahrenheit.jpg'),
                ('Dune', 'Frank Herbert', 18.00, 'Science Fiction', 'dune.jpg'),
                ('The Alchemist', 'Paulo Coelho', 12.99, 'Philosophical Fiction', 'alchemist.jpg');
                `);
            }
        }).then(()=>{
            console.log('Database setup complete.');
        })
    })
}

export const getDbConnection = () =>{
    return open({
        filename: dbPath,
        driver: sqlite3.Database
    });
};

