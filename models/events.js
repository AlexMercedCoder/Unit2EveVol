const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    username:  String,
    title:  String,
    date: String,
    description: String,
    location: String,
    volunteers: Array

});

const Events = mongoose.model('evevolevents', eventSchema);

module.exports = Events;
