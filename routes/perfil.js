const express = require('express');
const router = express.Router();
const authRoutes = express.Router();
const User = require("../models/User");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('perfil/perfil');
});

module.exports = router;