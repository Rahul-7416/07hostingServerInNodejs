const mongoose = require('mongoose');

const menuItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['spicy', 'sweet', 'sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

const MenuItems = mongoose.model('MenuItem', menuItemsSchema, 'RJ Restaurant Menu Items');
module.exports = MenuItems;