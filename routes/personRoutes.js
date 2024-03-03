const express = require('express');
const router = express.Router();
const Person = require('../models/person.js');

// Implementation of CRUD applications on endpoints
// C -> Create -> POST
// R -> Read -> GET
// U -> Update -> PUT/PATCH
// D -> Delete -> DELETE


// To fetch all the documents/records present in the collection/Table People
router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

// To fetch specific documents/records based on workType
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({error: 'Invalid work type'})
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({Error: 'Internal Server Error!'})
    }
})


// POST route to add a person 
// using the async await
router.post('/', async (req, res) => {
    try{
        const data = req.body; // Assuming the request body contains the person data 

        // Create a newPerson document using the Mongoose model
        const newPerson = new Person(data);

        // Save the newPerson to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res) => {
    try {
        // NOTE: here the id we are talking about is the unique _id given to every document object by the MongoDB
        const personId = req.params.id; // Extracts the id from the URL parameter
        const updatePersonData = req.body; // Update the mentioned data for the person
        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // return the updated document
            runValidators: true, // run the Mongoose validation, like unique, required, etc
        })

        // Now, there might be a chance, that the id user is entering can be invalid, that it does'nt exist in the collection
        // NOTE: must use the return keyword inside this if statement, as we don't want to run the codes after this if statement execution
        // REASON: Once you have sent a res to the client, you can't do it again for the same req, so it will crash the server
        if (!response) {
            return res.status(404).json({error: 'Person not found!'});
        }
        console.log(`Person with objectId: ${personId}, data Updated`)
        res.status(200).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found!'})
        }
        res.status(200).json({message: 'person deleted successfully!'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'})
    }
})

module.exports = router;