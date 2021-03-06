const mongoose = require('mongoose');

module.exports = function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.commentId)) {
    next();
  } else {
    res.status(400).send('Invalid Comment ID');
  }
};
