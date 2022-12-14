const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Worked on by entire team
//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    // eventID: {
    //     type: Number,
    //     require: true,
    //     unique: true
    // },
    eventName: {
        type: String,
        require: true
    },
    organizationID: {
        type: mongoose.Schema.Types.Number,
        ref: 'OrganizationData'
    },
    services:{
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: {
        type: [String]
    }
}, {
    collection: 'eventData',
    timestamps: true
});

const EventData = mongoose.model('eventData', eventDataSchema);

module.exports = { EventData }
