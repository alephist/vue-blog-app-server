const express = require('express');
const cors = require('cors');
const posts = require('./post');
const comments = require('./comment');
const users = require('./user');
const auth = require('./auth');

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());

  app.use('/api/posts', posts);
  app.use('/api/posts/:id/comments', comments);
  app.use('/api/users', users);
  app.use('/auth', auth);
};
