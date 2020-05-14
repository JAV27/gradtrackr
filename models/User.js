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
            class_requirements: [
                {
                    fullName: String,
                    abbr: [String],
                    status: [
                        {
                            status_number: Number,
                            classes_satisfying: Number
                        }
                    ]
                }
            ] 
        }
    ]
});

const User = mongoose.model('user', userSchema);

module.exports = User;