const express = require('express');
const utils = require('../utils/fs');

const talker = express.Router();

const filePath = '../talker.json';

talker.get('/', async (req, res) => {
  const talkersData = await utils.readFile(filePath);
  res.status(200).json(talkersData);
});

module.exports = talker;
