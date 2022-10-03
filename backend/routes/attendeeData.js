const express = require("express");
const router = express.Router();

//importing data model schemas
let { AttendeeData } = require("../models/attendees"); 
let { EventData } = require("../models/event"); 


//PUT Updating a client to an event
router.put('/event-attendee', (req, res, next) => {
    EventData.findOneAndUpdate({ _id: req.params.eventID }, 
        // add the attendee name to the attendees array isnide event document
        { $push: { attendees: req.body.fullName } },
        (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send('Client is added to event.');
            console.log('Event successfully updated!', data)
        }
    })
});