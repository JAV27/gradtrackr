const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    when: {
        type: String,
        require: true
    },
    classes_taken: [
        {
            class: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'class' 
            },
            grade: {
                type: String,
                default: "None"
            }
        }
    ]
});

const Semester = mongoose.model('semester', semesterSchema);

module.exports = Semester;