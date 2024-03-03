const express = require('express');
const app = express();
const db = require('./db');
const port = 3000;
const MenuItems = require('./models/MenuItems.js')

const bodyParser = require('body-parser');

// parse and extract the data from the http request's body
// convert it from the json to object form 
// store it in the req.body
app.use(bodyParser.json()); 

app.get('/', (req, res) => {
    res.send('Welcome to our hotel... ')
})

// Import the router files
const personRoutes = require('./routes/personRoutes.js');
const menuItemRoutes = require('./routes/menuItemsRoutes.js')
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(port, () => {
    console.log(`Nodejs server is live on port: ${port}`)
})