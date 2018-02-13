const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/perfil', function(req, res, next) {
  res.render('perfil/perfil');
});

module.exports = router;