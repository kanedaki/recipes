const getRandomNumber = n => Math.round(Math.random() * n);

const getRandom = arr => arr[getRandomNumber(arr.length - 1)];

module.exports = {
  getRandom
};
