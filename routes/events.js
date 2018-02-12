const express = require('express');
const Event = require('../models/Event');
const TYPES = require('../models/Event-types');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/new', (req, res) => {
  res.render('home/new', { types: TYPES });
});

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  const newEvent = new Event({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline,

    _creator: req.user._id
  });


    newEvent.save( (err) => {
      if (err) {
        res.render('home/new', { campaign: newEvent, types: TYPES });
      } else {
        res.redirect(`/home/${newEvent._id}`);
      }
    });
});

router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err){ return next(err); }

    event.populate('_creator', (err, event) => {
      if (err){ return next(err); }
      return res.render('home/show', { event });
    });
  });
});

module.exports = router;