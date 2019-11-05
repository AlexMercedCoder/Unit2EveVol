const mongoose = require('mongoose');

const volSchema = new mongoose.Schema({
    username:  String,
    name:  String,
    age: String,
    phone: String,
    email: String,
    skills: String

});

const Volunteers = mongoose.model('evevolvolunteers', volSchema);

module.exports = Volunteers;
