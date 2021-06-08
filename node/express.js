// TODO: Move constants to .env file.
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const initMongoose = require('./initMongoose');
const apiRouter = require('./routers/api');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors('*'));
app.use(cookieParser());
app.use(express.static("uploads/"));

app.use('/api', apiRouter);

app.use(errorHandler);

initMongoose().then(() => {
  app.listen(3002, () => {
    console.log('started listening on port 3002');
  });
});
