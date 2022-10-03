const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let organizationDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    name: {
        type: Array,
        require: true
    },
    description: {
        type: Array,
        require: true
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientData'
      }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eventData'
      }],
}, {
    collection: 'organizationData',
    timestamps: true
});


//collection for clientIntakeData
let clientDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    collection: 'clientData',
    timestamps: true
});


//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventID: {
        type: Number,
        require: true
    },
    eventName: {
        type: String,
        require: true
    },
    services: {
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
    attendees: [{
        type: mongoose.Schema.Types.Number,
        ref: 'ClientData'
    }]
}, {
    collection: 'eventData'
});

// create models from mongoose schemas
// const OrganizationData = mongoose.model('OrganizationData', organizationDataSchema);
// const ClientData = mongoose.model('clientData', clientDataSchema);
// const EventData = mongoose.model('eventData', eventDataSchema);

// // package the models in an object to export 
// module.exports = { OrganizationData, ClientData, EventData }
