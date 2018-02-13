const express = require('express');
const Event = require('../models/Event');
const TYPES = require('../models/Event-types');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');

const ensureLoggedIn = (redirect_url) => {
  return (req, res, next) => {
      if (req.user) {
          next()
      } else {
          res.redirect(redirect_url)
      }
  }
}

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
  
router.post('/new', ensureLoggedIn('/login'), (req, res, next) => {
    // router.post('/new', (req, res, next) => {
     //PROBLEMAS AL CREAR UN EVENTO NUEVO
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
          res.render('/', { event: newEvent, types: TYPES });
        } else {
          res.redirect(`/home/${newEvent._id}`);
        }
      });
  });
  

  router.get('/:id', (req, res, next) => {
    console.log("------------------------------> Hola")
    console.log(req.params.id)
    Event.findById(req.params.id).populate('creatorId')
        .then(c => res.render('events/show', { event: c }))
        .catch(e => next(e));
});

router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
      if (err) { return next(err) }
      if (!event) { return next(new Error("404")) }
      return res.render('events/edit', { event, types: TYPES })
  });
});


module.exports = router;