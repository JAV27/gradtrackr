const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activeRequirementGroupSchema = new Schema({
    name: String,
    activeRequirements: [
        {
            fullName: String,
            abbr: [String],
            status: {
                needToTake: Number,
                taking: Number,
                taken: Number
            }
        }
    ]
});

const ActiveRequirementGroup = mongoose.model('activerequirementgroup', activeRequirementGroupSchema);

module.exports = ActiveRequirementGroup;