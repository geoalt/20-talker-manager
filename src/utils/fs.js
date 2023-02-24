const fs = require('fs').promises;
const path = require('path');

const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(path.resolve(__dirname, filePath), {
      encoding: 'utf-8',
    });
    const parsed = JSON.parse(data);

    return parsed;
  } catch (err) {
    console.error(err.message);
  }
};

const writeFile = async (filePath, content) => {
  try {
    await fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(content, null, 2));
  } catch (err) {
    console.error(err.message);
  }
};

const updateFile = async (filePath, talkerId, content) => {
  try {
    const data = await readFile(filePath);

    const updatedData = data.reduce((newData, currentTalker) => {
      if (currentTalker.id === Number(talkerId)) {
        return [...newData, { ...currentTalker, ...content }];
      }

      return [...newData, currentTalker];
    }, []);

    writeFile(filePath, updatedData);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  readFile,
  writeFile,
  updateFile,
};
