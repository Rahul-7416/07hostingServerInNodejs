// This file will act as bridge between our Nodejs Server and the MongoDB Server

// Step1.1: Import Mongoose
const mongoose = require('mongoose');

// Import the dotenv file variables
require('dotenv').config();

// Step1.2: Define the MongoDB URL
// const mongoURL = process.env.MONGODB_URL_LOCAL; // our local URL, which connects with our local database
const mongoURL = process.env.MONGODB_URL // this is the URL, our local URL, which connects with our online database

// Step3: Set up MongoDB connection
// this step intializes the connection, but does'nt connect to the MongoDB Server at this point
mongoose.connect(mongoURL)

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


