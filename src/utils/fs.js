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
    const data = await readFile(filePath);
    const newData = [...data, content];

    await fs.writeFile(path.resolve(__dirname, filePath), JSON.stringify(newData, null, 2));
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  readFile,
  writeFile,
};
