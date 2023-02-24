const express = require('express');
const middlewares = require('../middlewares');
const utils = require('../utils');

const login = express.Router();

login.post('/', middlewares.validateLogin, (_req, res) => {
  const token = utils.tokenGenerator(16);

  res.status(200).json({ token });
});

module.exports = login;
