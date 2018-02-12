// routes/timelineController.js
const express = require("express");
const timelineController = express.Router();

// Models
const Event = require("../models/Event");

// Moment to format dates
const moment = require("moment");

timelineController.get("/", (req, res) => {
    Event
        .find({}, "user_name event created_at")
        .sort({
            created_at: -1
        })
        .exec((err, timeline) => {
            res.render("/home", {
                timeline,
                moment
            });
        });
});

module.exports = timelineController;