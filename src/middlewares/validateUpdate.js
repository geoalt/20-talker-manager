const { fs } = require('../utils');

const filePath = '../talker.json';

const validateUpdate = async (req, res, next) => {
  const { id } = req.params;
  const talkersData = await fs.readFile(filePath);

  const foundTalker = talkersData.find((it) => it.id === Number(id));

  if (!foundTalker) {
    return res.status(404).json({ message: 'Talker não encontrado' });
  }

  next();
};

module.exports = validateUpdate;