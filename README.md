# IN_ventory CIT 313 Assignment

 Purdue Golden Book Supply

Separation of Concerns
 - This application separates the database configuration, initialization and data seeding using SQLite in database.js.
 - Then app.js acts as the central controller, running GET requests and the functions that will run the SQL queries.
 - Finally, the EJS templates are used within the view folder in order to separate the pages from the server controller (app.js)
 - This application basically follows the model view controller design pattern, the database model, app controller, and page views being separated, each doing their own thing but working together


Routes
 - This application routes to each page using different GET commands
 - GET / runs the database connection and then renders the index page to show all the book information
 - GET /about renders the page view for the about page
 - GET /contact renders the page view for the contacts page.
 - These are then put as links into a menu partial in order to allow for the pages to transition properly.


