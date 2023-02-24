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

module.exports = {
  readFile,
};
