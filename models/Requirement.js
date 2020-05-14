const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requirementSchema = new Schema({
    name: String,
    class_requirements: [
        {
            fullName: String,
            abbr: [String]
        }
    ]
});

const Requirement = mongoose.model('requirement', requirementSchema);

module.exports = Requirement;