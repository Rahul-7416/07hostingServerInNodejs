const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to our hotel... ')
})

// Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuItemRoutes = require('./routes/menuItemsRoutes.js')
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
    console.log(`Nodejs server is live on port: ${PORT}`)
})