const express = require("express");
const router = express.Router();

//importing data model schemas
let { EventData } = require("../models/event"); 

//GET all entries
router.get("/", (req, res, next) => { 
    EventData.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET event by eventID
router.get("/eventid/:id", (req, res, next) => { 
    EventData.find({ eventID: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    EventData.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    EventData.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    EventData.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

// variable that gets durrent date
var today = new Date();
console.log(today)
var Months = new Date();
var twoMonthsAgo = new Date(Months.setMonth(Months.getMonth()-2));
console.log(twoMonthsAgo)
console.log(today)

//GET number of attendees for Events from last 2 months
router.get("/count", (req, res, next) => { 
    EventData.find(
        { createdAt: {$gte: twoMonthsAgo, $lt: today}}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                EventData.aggregate(
                    [{$project:{"eventName": 1, "eventID": 1,
                     "Number of Attendees":{$size:"$attendees"}}}],
                    (error, data) => { 
                        if (error) {
                            return next(error);
                        } else {
                            res.json(data);
                        }
                    }
                );
            }
        }
    );
});

// ).sort({ 'updatedAt': -1 }).limit(10);

//Get number of attendees test
router.get("/count1", (req, res, next) => { 
    EventData.aggregate(
        [{$project:{"eventName": 1, "eventID": 1,
         "Number of Attendees":{$size:"$attendees"}}}],
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//POST
router.post("/", (req, res, next) => { 
    EventData.create( 
        req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT update event
router.put("/:id", (req, res, next) => {
    EventData.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event using clinetID
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    EventData.find( 
        { eventID: req.params.id, attendees: req.body.clientID }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    EventData.updateOne(
                        { eventID: req.params.id }, 
                        { $push: { attendees: req.body.clientID } },
                        (error, data) => {
                            if (error) {                                
                                return next(error);
                            } else {
                                res.send('Client is added to event.');
                                console.log('Event successfully updated!', data)
                            }
                        }
                    );
                }
                
            }
        }
    );
});

//DELETE event by eventID
router.delete('/:id', (req, res, next) => {
    EventData.findOneAndRemove({ eventID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: ('Event is deleted')
            });
        }
    });
});

module.exports = router;