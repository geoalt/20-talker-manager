const express = require('express');
const generateToken = require('../utils/tokenGenerator');

const login = express.Router();

login.post('/', (req, res) => {
  // const { email, password } = req.body;

  const token = generateToken(16);

  res.status(200).json({ token });
});

module.exports = login;
