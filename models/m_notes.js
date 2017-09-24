const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    author: String,
    title: String,
    desc: String
});

const NotesModel = mongoose.model('NotesModel', NotesSchema);

module.exports = NotesModel;