const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { ClientData } = require("../models/client"); 

//GET all entries
// Created by Rahman Ali
router.get("/", (req, res, next) => { 
    ClientData.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET client by ID
// Created by Rahman Ali
router.get("/id/:id", (req, res, next) => {
    ClientData.find( 
        {_id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    ClientData.find( 
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

//GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    
});

//POST
router.post("/", (req, res, next) => { 
    ClientData.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    ClientData.createdAt;
    ClientData.updatedAt;
    ClientData.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
// Created by Zachary Blackwell
router.put("/:id", (req, res, next) => { 
    ClientData.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send('Client succesfully updated.');
            }
        }
    );
});

//DELETE client by clientID
// Created by Zachary Blackwell
router.delete('/:id', (req, res, next) => {
    ClientData.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: ('Client is deleted')
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
