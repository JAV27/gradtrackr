const mongoose = require('mongoose');
const ActiveRequirementGroup = require('./ActiveRequirementGroup')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    major: {
        type: String,
        default: "None",
    },
    ActiveRequirementGroups: [ActiveRequirementGroup]
});

const User = mongoose.model('user', userSchema);

module.exports = User;