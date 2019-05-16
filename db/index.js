const mongoose = require('mongoose');
const config = require('../config');

module.exports = function() {
  mongoose
    .connect(config.mongoUri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to the database...'))
    .catch((err) => {
      console.log(`Error: ${err.message}`);
      process.exit(1);
    });
};
