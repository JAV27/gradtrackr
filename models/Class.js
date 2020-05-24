const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: String,
    category: String,
    class_number: Number,
    description: String,
    prereqs: [
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'class' 
        }] 
    ],
    grad_requirements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'requirementgroup.requirements'
    }]
});

const Class = mongoose.model('class', classSchema);

module.exports = Class;