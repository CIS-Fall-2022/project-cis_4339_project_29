const express = require("express");
const router = express.Router();

//importing data model schemas
let { EventData } = require("../models/event"); 

//GET all entries
// Created by Rahman Ali
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
// Created By Joe Morris 
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
// Created By Joe Morris 
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
// Created By Joe Morris 
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
// Created By Joe Morris 
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
var Months = new Date();
var twoMonthsAgo = new Date(Months.setMonth(Months.getMonth()-2));


//GET number of attendees for Events from last 2 months
// Created by Zachary Blackwell
router.get("/count", (req, res, next) => { 
    EventData.find(
        { createdAt: {$gte: twoMonthsAgo, $lt: today}}, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                EventData.aggregate(
                    [{$project:{"_id": 0, "eventName": 1, "eventID": 1,
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


//POST
// Created By Joe Morris 
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
// Created By Joe Morris 
router.put("/:id", (req, res, next) => {
    EventData.findOneAndUpdate(
        { eventID: req.params._id},
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Event succesfully updated.');
            }
        }
    );
});

//PUT add attendee to event using clinetID
// Created by Zachary Blackwell
// router.put("/addAttendee/:id", (req, res, next) => {
//     //only add attendee if not yet signed uo
//     EventData.find( 
//         { _id: req.params.id, attendees: req.body._id }, 
//         (error, data) => { 
//             if (error) {
//                 return next(error);
//             } else {
//                 if (data.length == 0) {
//                     EventData.updateOne(
//                         { _id: req.params.id }, 
//                         { $push: { attendees: req.body._id } },
//                         (error, data) => {
//                             if (error) {
//                                 return next(error);
//                             } else {
//                                 res.send('Client is added to event.');
//                                 console.log('Event successfully updated!', data)
//                             }
//                         }
//                     );
//                 }
                
//             }
//         }
//     );
// });


router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed uo
    EventData.find( 
        {_id: req.params.id, attendees: req.body._id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                if (data.length == 0) {
                    EventData.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body._id } },
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

// Created by Zachary Blackwell
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

// error handler
// Created By Joe Morris 
router.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

module.exports = router;
