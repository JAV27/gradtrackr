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
    }
});

const Semester = mongoose.model('semester', semesterSchema);

module.exports = Semester;