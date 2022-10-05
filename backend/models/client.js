const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    signUpDate: {
        type: Date,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    organizationID: {
        type: Number,
        require: true,
        unique: true
    }
}, {
    collection: 'clientData',
    timestamps: true
});


const ClientData = mongoose.model('clientData', clientDataSchema);

module.exports = { ClientData }
