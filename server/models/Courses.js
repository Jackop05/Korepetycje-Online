const mongoose = require('mongoose');

const informacjeKursySchema = new mongoose.Schema({
    monday: [
        {
            hour: String,
            numberOfAvailable: String
        }
    ],
    tuesday: [
        {
            hour: String,
            numberOfAvailable: String
        }
    ],
    wednesday: [
        {
            hour: String,
            numberOfAvailable: String
        }
    ],
    thursday: [
        {
            hour: String,
            numberOfAvailable: String
        }
    ],
    friday: [
        {
            hour: String,
            numberOfAvailable: String
        }
    ],
});

const InformacjeKursy = mongoose.model('InformacjeKursy', informacjeKursySchema);

module.exports = InformacjeKursy;