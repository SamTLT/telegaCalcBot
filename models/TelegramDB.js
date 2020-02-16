const mongoose = require('mongoose');

const telegaData = mongoose.Schema({
    updateId: {
        type: Number,
        required: true,
    },
    data: {
        type: Object,
        required: true
    },
    chatId: {
        type: Number,
        required: false,
    }
})

module.exports = mongoose.model('telegaData', telegaData);