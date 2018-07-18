require('./config/config');
const express = require('express');
const app = express();
const logger =  require('./utils/logger');
const bodyParser = require('body-parser');
const mongoConnecion = require('./db/mongo');
mongoConnecion.createConnection();

app.use(require('cors')());
// Logging unhandled promises rejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(process.env.PORT, () => {
  logger.debug(`Listening on port ${process.env.PORT}`);
});
