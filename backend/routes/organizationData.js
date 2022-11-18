const express = require("express");
const router = express.Router();

//importing data model schemas
let { OrganizationData } = require("../models/organization"); 


//GET all entries
router.get("/", (req, res, next) => { 
    OrganizationData.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//Zacahary Blackwell
//Get Org_name from Org_id
//Recieves the org ID from the .env and then looks through ther database for matching results
router.get("/org_id", (req, res, next) => { 
    OrganizationData.find( 
        { organizationID: process.env.organizationID }, {organizationName:1},
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
    OrganizationData.create( 
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

// error handler
// Created By Joe Morris 
router.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

module.exports = router;
