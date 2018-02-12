const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', (req, res, next) => {

  Event
    .find({})
    .populate('_creator')
    .exec((err, events) => {
      res.render('index', { events });
    });

});
module.exports = router;