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

module.exports = router;