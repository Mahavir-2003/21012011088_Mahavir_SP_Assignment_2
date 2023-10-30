const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {type : String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    isAvailable: {type: Boolean, required: true}
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;