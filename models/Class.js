const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: String,
});

const Class = mongoose.model('class', classSchema);

module.exports = Class;