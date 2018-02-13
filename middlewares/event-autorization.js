const Event = require('../models/Event.js');

function authorizeEvent(req, res, next){
  Event.findById(req.params.id, (err, event) => {
    // If there's an error, forward it
    if (err)      { return next(err) }
    // If there is no event, return a 404
    if (!event){ return next(new Error('404')) }
    // If the event belongs to the user, next()
    if (event.creatorId.equals(req.user._id)){
      return next()
    } else {
    // Otherwise, redirect
      return res.redirect(`/home/${event._id}`)
    }
  });
}
module.exports = authorizeEvent;