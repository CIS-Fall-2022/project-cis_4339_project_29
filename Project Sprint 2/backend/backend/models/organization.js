const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let organizationDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationID: {
        type: Number,
        require: true,
        unique: true
    },
    organizationName: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    clients: [{
        type: mongoose.Schema.Types.Number,
        ref: 'clientData'
      }],
    events: [{
        type: mongoose.Schema.Types.Number,
        ref: 'eventData'
      }],
}, {
    collection: 'organizationData',
    timestamps: true
});

const OrganizationData = mongoose.model('organizationData', organizationDataSchema);

module.exports = { OrganizationData }