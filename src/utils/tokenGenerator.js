const A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const B = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const getRandomArray = () => {
  const randomedArray = Math.ceil(Math.random() * 2);

  if (randomedArray === 1) {
    return A;
  }

  return B;
};

const getRandomValue = () => {
  const randomedValue = Math.ceil(Math.random() * 9);

  return randomedValue;
};

const generateToken = (size) => {
  const generatedArray = [];

  for (let i = 0; i < size; i += 1) {
    generatedArray.push(getRandomArray()[getRandomValue()]);
  }

  return generatedArray.join('');
};

module.exports = generateToken;
