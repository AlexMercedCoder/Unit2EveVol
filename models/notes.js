const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    username:  String,
    title:  String,
    notes: String,

});

const Notes = mongoose.model('evevolnotes', notesSchema);

module.exports = Notes;
