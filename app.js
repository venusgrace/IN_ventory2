import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { setUpDatabase, getDbConnection } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

// Initialize DB
setUpDatabase().catch((error)=>{
    console.error("Database setup error:", error);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    getDbConnection()
        .then(db => db.all('SELECT * FROM books'))
        .then(books => {
            res.render('pages/index', {
                data: books,
                title: 'Purdue Golden Book Supply',
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/about', (req, res)=>{
    res.render('pages/about', {title: "About Us"});
});

app.get('/contact', (req, res)=>{
    res.render('pages/contact', {title:"Contact Us"});
});

app.listen(port, () =>{
    console.log(`App listening at port ${port}`);
});
