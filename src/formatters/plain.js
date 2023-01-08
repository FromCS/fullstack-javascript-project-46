import _ from 'lodash';

const isChanged = (key) => key.startsWith('+') || key.startsWith('-');

const makeQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

const defineComplexValue = (value) => (_.isObject(value) ? '[complex value]' : makeQuotes(value));

const comparePropertyInOneData = (currentKey, value, newKey) => {
  switch (currentKey[0]) {
    case '+':
      return `Property '${newKey}' was added with value: ${defineComplexValue(value)}`;
    case '-':
      return `Property '${newKey}' was removed`;
    default:
      return '';
  }
};

const definePointInComplexProperty = ((value) => (value === '' ? '' : '.'));

const comparePropertyInBothData = (entries, newKey, nextEntries, previousKey) => {
  const [currentKey, currentValue] = entries;
  const [nextKey, nextValue] = nextEntries;
  if (`+ ${currentKey.slice(2)}` === nextKey) {
    return `Property '${newKey}' was updated. From ${defineComplexValue(currentValue)} to ${defineComplexValue(nextValue)}`;
  }
  if (`- ${currentKey.slice(2)}` !== previousKey) {
    return comparePropertyInOneData(currentKey, currentValue, newKey);
  }
  return '';
};

const makePlain = (obj) => {
  const iter = (currentValue, acc) => {
    const entries = Object.entries(currentValue);
    const plain = entries.map(([key, value], i, arr) => {
      if (!isChanged(key) && _.isObject(value)) {
        return iter(value, `${acc}${definePointInComplexProperty(acc)}${key}`);
      }
      const newKey = `${acc}${definePointInComplexProperty(acc)}${key.slice(2)}`;
      const [nextKey, nextValue] = arr[i + 1] || '';
      const [previousKey] = arr[i - 1] || '';
      return comparePropertyInBothData([key, value], newKey, [nextKey, nextValue], previousKey);
    });

    return _.compact(plain).join('\n');
  };
  return iter(obj, '');
};

export default makePlain;
