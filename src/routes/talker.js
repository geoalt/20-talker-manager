const express = require('express');
const middlewares = require('../middlewares');
const { fs } = require('../utils');

const talker = express.Router();

const filePath = '../talker.json';

talker.get('/', async (_req, res) => {
  const talkersData = await fs.readFile(filePath);
  return res.status(200).json(talkersData);
});

talker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkersData = await fs.readFile(filePath);

  const foundTalker = talkersData.find((it) => it.id === Number(id));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(foundTalker);
});

talker.post(
  '/',
  middlewares.validateToken,
  middlewares.validatePersonalInfo,
  middlewares.validateTalk,
  async (req, res) => {
    const talkersData = await fs.readFile(filePath);
    const talkerNewId = talkersData[talkersData.length - 1].id + 1;
    const newTalker = { id: talkerNewId, ...req.body };

    await fs.writeFile(filePath, newTalker);

    return res.status(201).json(newTalker); 
  },
);

module.exports = talker;
