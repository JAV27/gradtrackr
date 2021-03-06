const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    major: {
        type: String,
        default: "None",
    },
    requirements: [
        {
            name: String,
            active_requirements: [
                {
                    fullName: String,
                    abbr: [],
                    minCount: Number,
                    status: {
                        planToTake: Number,
                        taken: Number
                    }
                }
            ] 
        }
    ]
});

const User = mongoose.model('user', userSchema);

module.exports = User;