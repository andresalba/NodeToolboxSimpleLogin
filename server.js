const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./passport-config');
const Login = require('./models/Login')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simplelogindb', { useNewUrlParser: true, useUnifiedTopology: true })

initializePassport (
    passport, 
    email => {
        //return userDb.find(user => user.email === email) //cambiar a query
        return Login.findOne({ email }).exec();
    },
    id => {
        //return userDb.find(user => user.id === id) //cambiar a query
        return Login.findOne({ _id: id }).exec();
    },    
)

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/register'));

// Server config
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


// in the console start mongodb with mongod
// in other tab nodemon server
// http://localhost:5000/