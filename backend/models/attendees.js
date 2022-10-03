const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let attendeeSchema = new Schema({
    clientID: {
        type: Number,
        require: true
    }
}, {
    collection: 'attendees',
    timestamps: true
});


const AttendeeData = mongoose.model('attendeeData', attendeeSchema);

module.exports = { AttendeeData }