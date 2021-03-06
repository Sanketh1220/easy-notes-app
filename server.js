const express = require('express');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

//create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

// parse requests of content-type - application/json
app.use(express.json());

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    //to avoid warning of deprecation
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to EasyNotes App. Take notes quickly."
    })
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on local host port 3000");
})