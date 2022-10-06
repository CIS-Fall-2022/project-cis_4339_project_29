const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Worked on by entire team
let organizationDataSchema = new Schema({
    organizationID: {
        type: Number,
        require: true,
        unique: true
    },
    organizationName: {
        type: String,
        require: true
    }
}, {
    collection: 'organizationData',
    timestamps: true
});

const OrganizationData = mongoose.model('organizationData', organizationDataSchema);

module.exports = { OrganizationData }
