const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requirementGroupSchema = new Schema({
    name: String,
    requirements: [
        {
            fullName: String,
            abbr: [String]
        }
    ]
});

const RequirementGroup = mongoose.model('requirementgroup', requirementGroupSchema);

module.exports = RequirementGroup;