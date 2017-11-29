const getRandomNumber = n => Math.round(Math.random() * n);

const getRandom = arr => {
  if (!Array.isArray(arr) || !arr.length) return;
  return arr[getRandomNumber(arr.length - 1)];
};

const findOrMessage = function(fn, msg) {
  return function(...args) {
    const result = fn.apply(this, args);
    return result || `${msg} ${args}`;
  };
};

const sameLength = function(list1, list2) {
  return list1.length === list2.length  
}


module.exports = {
  sameLength,
  getRandom,
  findOrMessage
};
