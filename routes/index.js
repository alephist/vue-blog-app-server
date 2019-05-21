const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const posts = require('./post');
const comments = require('./comment');
const users = require('./user');
const auth = require('./auth');

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.use(compression());
  }

  app.use('/api/posts', posts);
  app.use('/api/posts/:id/comments', comments);
  app.use('/api/users', users);
  app.use('/auth', auth);
};
