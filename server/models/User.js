const mongoose = require('mongoose');

const informacjeUczniowieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    surname: {
        type: String,
        required: true,
        lowercase: true,
    },
    age: {
        type: Number,
    },
    noteFromUser: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    firstCourseDate: {
        type: Date,
        required: true,
    },
    paidTotal: {
        type: Number,
        default: 0,
    },
    courses: [
        {
            hour: String,
            length: String,
            day: String,
            number: String,
            courseType: String,
        }
    ],
    actions: [
        String
    ],
});

const InformacjeUczniowie = mongoose.model('InformacjeUczniowie', informacjeUczniowieSchema);

module.exports = InformacjeUczniowie;