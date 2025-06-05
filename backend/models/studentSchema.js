const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    progress: [{
        examName: {
            type: String,
            required: true
        },
        attempts: [{
            marks: {
                type: Number,
                required: true
            },
            topics: [{
                type: String
            }]
        }]
    }]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
