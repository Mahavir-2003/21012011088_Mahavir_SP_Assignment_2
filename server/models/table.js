const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    number: {type : Number, required: true},
    isAvailable: {type: Boolean, required: true , default : true},
    order : { type : Array, required: false ,default : [] }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;