const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Worked on by entire team
let clientDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    clientID: {
        type: Number,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        primaryPhone: {
        type: Number,
        unique: true
        },
        secondaryPhone: {
        type: Number
        }
    },
    address: {
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        }
    },
    organizationID: {
        type: Number,
    }
}, {
    collection: 'clientData',
    timestamps: true
});


const ClientData = mongoose.model('clientData', clientDataSchema);

module.exports = { ClientData }
