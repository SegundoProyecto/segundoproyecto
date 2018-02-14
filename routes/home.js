const express = require('express');
const Event = require('../models/Event');
const User = require("../models/User");
const TYPES = require('../models/Event-types');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const authorizeEvent = require('../middlewares/event-autorization');

const ensureLoggedIn = (redirect_url) => {
  return (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.redirect(redirect_url)
    }
  }
}

router.get('/', ensureLoggedIn('/auth/login'), (req, res, next) => {

  Event
    .find({})
    .populate('creatorId')
    .exec((err, events) => {
      res.render('events/home', { events });
    });
});

router.get('/new', (req, res) => {
  res.render('events/new', { types: TYPES });
});

router.post('/new', ensureLoggedIn('/auth/login'), (req, res, next) => {
  const newEvent = new Event({
    title: req.body.title,
    totalPeople: req.body.totalPeople,
    description: req.body.description,
    category: req.body.category,
    deadline: req.body.deadline,
    creatorId: req.user._id
  });

  newEvent.save((err) => {
    if (err) {
      res.render('events/home', { event: newEvent, types: TYPES });
    } else {
      res.redirect(`/home/${newEvent._id}`);
    }
  });
});

router.get('/:id', (req, res, next) => {
  Event.findById(req.params.id).populate('creatorId')
    .then(c => res.render('events/show', { event: c }))
    .catch(e => next(e));
});

router.get('/:id/edit', ensureLoggedIn('/auth/login'), authorizeEvent, (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) { return next(err) }
    if (!event) { return next(new Error("404")) }
    return res.render('events/edit', { event, types: TYPES })
  });
});

router.post('/:id/edit', ensureLoggedIn('/auth/login'), authorizeEvent, (req, res, next) => {
  const updates = {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    category: req.body.category,
  };

  Event.findByIdAndUpdate(req.params.id, updates, (err, event) => {
    if (err) {
      return res.render('events/edit', {
        event,
        errors: event.errors
      });
    }
    if (!event) {
      return next(new Error('Error al editar, el evento no existe'));
    }
    return res.redirect(`/home/${event._id}`);
  });
});

router.get('/:id/gracias', ensureLoggedIn('/login'), (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) { return next(err) }
    if (!event) { return next(new Error("404")) }
    return res.render('events/gracias', { event })
  });
});

router.post('/:id/gracias', (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      event.currentPeople.push(res.locals.user._id);
      return event.save();
    })
    .then(event => {
      User.update(
        { "_id": res.locals.user._id },
        { $push: { "eventAsistId": event._id } }, { new: true }
      )
        .then(res.redirect(`/home/${event._id}`))
    })
    .catch(e => next(e));
});

module.exports = router;