const express = require('express');
const Event = require('../models/Event');
const TYPES = require('../models/Event-types');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');

router.get('/', (req, res, next) => {

  Event
    .find({})
    .populate('_creator')
    .exec((err, events) => {
      res.render('events/home', { events });
    });
});

router.get('/new', (req, res) => {
    res.render('events/new', { types: TYPES });
  });
  
  //router.post('/new', isLoggedIn('/login'), (req, res, next) => {
    router.post('/new', (req, res, next) => {
      console.log(req.sesionID)
    const newEvent = new Event({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      category: req.body.category,
      deadline: req.body.deadline,
      creatorId: req.sesion._id
    });
  
  
      newEvent.save( (err) => {
        if (err) {
          res.render('events/home', { campaign: newEvent, types: TYPES });
        } else {
          res.redirect(`/home/${newEvent._id}`);
        }
      });
  });
  
  router.get(':id', (req, res, next) => {
    Event.findById(req.params.id, (err, event) => {
      if (err){ return next(err); }
  
      event.populate('_creator', (err, event) => {
        if (err){ return next(err); }
        return res.render('events/show', { event });
      });
    });
  });
module.exports = router;