// This file will act as bridge between our Nodejs Server and the MongoDB Server

// Step1.1: Import Mongoose
const mongoose = require('mongoose');

// Step1.2: Define the MongoDB URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Step3: Set up MongoDB connection
// this step intializes the connection, but does'nt connect to the MongoDB Server at this point
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Step4: Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
// Basically it shows that whether the Mongoose is connected with the MongoDB Server or not.
const db = mongoose.connection;

// Step5: Define the event listeners for database connection
// How the db object will react on the basis of the connection, disconnection or error with the MongoDB Server
db.on('connected', () => {
    console.log('Connected to MongoDB Server');
})

db.on('error', (err) => {
    console.log('MongoDB connection error', err);
})

db.on('disconnected', () => {
    console.log('Disconnected from the MongoDB Server');
})

module.exports = db;


