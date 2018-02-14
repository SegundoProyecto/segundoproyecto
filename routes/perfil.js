const express = require("express");
const User = require('../models/User');
const Picture = require('../models/Picture');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const authorizeEvent = require('../middlewares/event-autorization');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

const ensureLoggedIn = (redirect_url) => {
  return (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.redirect(redirect_url)
    }
  }
}
router.get('/', function (req, res, next) {
  Picture.find((err, pictures) => {
  res.render('perfil/perfil', {pictures});
  })
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(c => res.render('perfil/perfil', { user: c }))
    .catch(e => next(e));
});

router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  console.log("hola")
  User.findById(req.params.id, (err, user) => {
    if (err) { return next(err) }
    if (!user) { return next(new Error("404")) }
    return res.render('perfil/edit')
  });;
});

router.post('/:id/edit', ensureLoggedIn('/auth/login'), (req, res, next) => {
  console.log("holaaaaa")
  let updates = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    description: req.body.description,
  };

  User.findByIdAndUpdate(req.params.id, updates, (err, user) => {
    if (err) {
      return res.render('perfil/edit', {
        user,
        errors: user.errors
      });
    }
    if (!user) {
      return next(new Error('Error al editar, el usuario no existe'));
    }
    return res.redirect(`/perfil`);
  });
});


// router.post('/:id/perfil', upload.single('photo'), function(req, res){
//   const pic = new Picture({
//     name: req.body.name,
//     path: `/uploads/${req.file.filename}`,
//     originalName: req.file.originalname,
//     creatorid: req.sesion._id,
//   });

//   pic.save((err) => {
//       res.redirect('/home');
//   });
// });


module.exports = router;

