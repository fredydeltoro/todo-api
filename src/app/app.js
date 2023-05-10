const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const authenticate = require('../lib/authenticate');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authenticate);

module.exports = app;
