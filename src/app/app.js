const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const db = require('../models');

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
