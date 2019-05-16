const express = require('express');
const config = require('./config');
const app = express();

require('./db')();
require('./routes')(app);

app.listen(config.port, () => {
  console.log(`Listening to port ${config.port}...`);
});
