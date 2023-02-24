const express = require('express');
const utils = require('../utils/fs');

const talker = express.Router();

const filePath = '../talker.json';

talker.get('/', async (req, res) => {
  const talkersData = await utils.readFile(filePath);
  return res.status(200).json(talkersData);
});

talker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersData = await utils.readFile(filePath);

  const findTalkerById = talkersData.find((it) => it.id === Number(id));

  if (!findTalkerById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(findTalkerById);
});

module.exports = talker;
