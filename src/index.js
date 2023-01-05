import _ from 'lodash';
import path from 'path';
import readFile from './parsers.js';
import chooseFormatters from './formatters/index.js';

const stringify = (obj, formatter = 'stylish') => {
  const makeFormatter = chooseFormatters(formatter);
  return makeFormatter(obj);
};

const getExtension = (filepath) => path.extname(filepath);

const getSortedKeysByName = (data1, data2) => _.sortBy(Object.keys({ ...data1, ...data2 }));

const makeDiff = (key, values, data, acc) => {
  const [value1, value2] = values;
  const [data1, data2] = data;
  if (!_.has(data1, key)) {
    acc[`+ ${key}`] = value2;
  }

  if (!_.has(data2, key)) {
    acc[`- ${key}`] = value1;
  }

  if (_.has(data1, key) && _.has(data2, key)) {
    if (value1 === value2) {
      acc[key] = value2;
    }
    if (value1 !== value2) { // условие неверное, нужен рефакторинг
      acc[`- ${key}`] = value1;
      acc[`+ ${key}`] = value2;
    }
  }
  return acc;
};

const getDiff = (data1, data2) => {
  const sortedGeneralKeys = getSortedKeysByName(data1, data2);
  const difference = sortedGeneralKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      acc[key] = getDiff(value1, value2);
      return acc;
    }
    return makeDiff(key, [value1, value2], [data1, data2], acc);
  }, {});
  return difference;
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = readFile(filepath1, getExtension(filepath1));
  const data2 = readFile(filepath2, getExtension(filepath2));
  const difference = getDiff(data1, data2);
  console.log(stringify(difference, formatter));
  return stringify(difference, formatter);
};

export default genDiff;
