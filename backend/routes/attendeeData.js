const express = require("express");
const router = express.Router();

//importing data model schemas
let { AttendeeData } = require("../models/attendees"); 
let { EventData } = require("../models/event"); 


//PUT Updating a client to an event
router.put('/event-attendee/:id', (req, res, next) => {
    EventData.findOneAndUpdate({ eventID: req.params.id }, 
        // add the attendee name to the attendees array inside event document
        { $push: { attendees: req.body.clientID } },
        (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send('Client is added to event.');
            console.log('Event successfully updated!', data)
        }
    })
});

module.exports = router;