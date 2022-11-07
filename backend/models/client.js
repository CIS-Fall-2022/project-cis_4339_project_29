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
    organizationID: {
        type: Number,
    }
}, {
    collection: 'clientData',
    timestamps: true
});


const ClientData = mongoose.model('clientData', clientDataSchema);

module.exports = { ClientData }
