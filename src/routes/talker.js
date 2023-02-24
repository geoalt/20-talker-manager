const express = require('express');
const middlewares = require('../middlewares');
const { fs } = require('../utils');

const talker = express.Router();

const filePath = '../talker.json';

talker.get(
  '/search',
  middlewares.validateToken,
  async (req, res) => {
    const { q } = req.query;
    const talkersData = await fs.readFile(filePath);

    if (q) {
      const filteredTalkerData = talkersData
        .filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()));

      return res.status(200).json(filteredTalkerData);
    }

    return res.status(200).json(talkersData);
  },
);

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
    const newTalkersData = [...talkersData, newTalker];

    console.log(newTalkersData);

    await fs.writeFile(filePath, newTalkersData);

    return res.status(201).json(newTalker); 
  },
);

talker.put(
  '/:id',
  middlewares.validateToken,
  middlewares.validatePersonalInfo,
  middlewares.validateTalk,
  middlewares.validateUpdate,
  (req, res) => {
    const { id } = req.params;
    const updateTalker = { id: Number(id), ...req.body };

    fs.updateFile(filePath, id, updateTalker);

    return res.status(200).json(updateTalker); 
  },
);

talker.delete(
  '/:id',
  middlewares.validateToken,
  (req, res) => {
    const { id } = req.params;

    fs.deleteTalker(filePath, id);

    return res.sendStatus(204);
  },
);

module.exports = talker;
