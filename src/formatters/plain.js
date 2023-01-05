import _ from 'lodash';

const isChanged = (key) => key.startsWith('+') || key.startsWith('-');

const makeQuotes = (value) => ((typeof value === 'boolean' || value === null) ? value : `'${value}'`);

// const getStringOfPlainFormatter = (currentKey, value, newKey) => {
// if ()
// };
const getStringOfPlainFormatter = (currentKey, value, newKey) => {
  if (currentKey.startsWith('-')) {
    return `Property '${newKey}' was removed`;
  }
  if (currentKey.startsWith('+')) {
    return `Property '${newKey}' was added with value: ${_.isObject(value) ? '[complex value]' : makeQuotes(value)}`;
  }
};

const makePlain = (obj) => {
  const iter = (currentValue, acc) => {
    const entries = Object.entries(currentValue);
    const plain = entries.map(([key, value], i, arr) => {
      if (!isChanged(key) && _.isObject(value)) {
        return iter(value, `${acc}${acc === '' ? '' : '.'}${key}`);
      }
      const newKey = `${acc}${acc === '' ? '' : '.'}${key.slice(2)}`;
      const [nextKey, nextValue] = arr[i + 1] === undefined ? '' : arr[i + 1];
      const [previousKey] = arr[i - 1] === undefined ? '' : arr[i - 1];
      if (`+ ${key.slice(2)}` === nextKey) {
        return `Property '${newKey}' was updated. From ${_.isObject(value) ? '[complex value]' : makeQuotes(value)} to ${makeQuotes(nextValue)}`;
      }
      if (`- ${key.slice(2)}` !== previousKey) {
        console.log(acc);
        return getStringOfPlainFormatter(key, value, newKey);
      }
    });

    return _.compact(plain).join('\n');
  };

  return iter(obj, '');
};

export default makePlain;
