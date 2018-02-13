const express = require("express");
const User = require('../models/User');
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

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(c => res.render('perfil/perfil', { event: c }))
    .catch(e => next(e));
});

router.get('/:id/edit', ensureLoggedIn('/login'), authorizeEvent, (req, res, next) => {
  User.findById(req.params.id, (err, event) => {
    if (err) { return next(err) }
    if (!event) { return next(new Error("404")) }
    return res.render('perfil/edit', { event, types: TYPES })
  });
});

router.post('/:id/edit', ensureLoggedIn('/auth/login'), authorizeEvent, (req, res, next) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    description: req.body.description,
  };
});

module.exports = router;

