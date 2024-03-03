const express = require('express');
const router = express.Router();
const MenuItems = require('../models/MenuItems.js')

router.get('/', async (req, res) => {
    try {
        // now to find the MenuItems, this operation might take some time to execute
        const data = await MenuItems.find();
        console.log('New Menu sended');
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({Error: 'Internal Server Error!'})
    }
})


// tasteType is a parameter variable
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType === 'sweet' || tasteType === 'sour' || tasteType === 'spicy') {
            const response = await MenuItems.find({taste: tasteType})
            res.status(200).json(response);
        }
        else {
            res.status(404).json({error: 'Invalid taste type'});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'});
    }
})

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        
        // Create a newMenuItem as per the data received
        const newMenuItem = new MenuItems(data);

        // now to save and acknowledge back the client
        const response = await newMenuItem.save();
        console.log('New Menu Item saved');
        res.status(200).json({
            ...response,
            NewItemAdded: true
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({Error: 'Internal Server Error!'});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id; // _id -> which document to be updated
        const updatedMsg = req.body; // What keys to be updated
        const response = await MenuItems.findByIdAndUpdate(itemId, updatedMsg, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            return res.status(404).json({error: 'Item not found!'});
        }
        console.log('Item data updated!')
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const response = await MenuItems.findByIdAndDelete(itemId);
        if(!response) {
            return res.status(404).json({error: 'Item not found!'});
        }
        res.status(500).json({error: 'Item Removed Successfully!'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'})
    }
})

module.exports = router;