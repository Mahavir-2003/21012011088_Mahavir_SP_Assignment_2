const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order: {
        type: Array,
        required: true
    },
    table: {
        type: Number,
        required: true
    },
    paymentStatus : {
        type: Boolean,
        required: true,
        default: false
    }
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;