import _ from 'lodash';
import path from 'path';
import readFile from './parsers.js';

const stringify = (obj, replacer = ' ', spaceCount = 2) => {
  const entries = Object.entries(obj);
  const string = entries.map(([key, value]) => `${replacer.repeat(spaceCount)}${key}: ${value}`);
  return `{\n${string.join('\n')}\n}`;
};

const getExtension = (filepath) => path.extname(filepath);

const getSortedKeysByName = (data1, data2) => _.sortBy(Object.keys({ ...data1, ...data2 }));

const getDiff = (data1, data2) => {
  const sortedGeneralKeys = getSortedKeysByName(data1, data2);
  const difference = sortedGeneralKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      acc[`${key}`] = getDiff(value1, value2);
      return acc;
    }

    if (!_.has(data1, key)) {
      acc[`+ ${key}`] = value2;
      return acc;
    }

    if (!_.has(data2, key)) {
      acc[`- ${key}`] = value1;
      return acc;
    }

    if (value1 === value2) {
      acc[`${key}`] = value2;
      return acc;
    }
    acc[`- ${key}`] = value1;
    acc[`+ ${key}`] = value2;
    return acc;
  }, {});
  return difference;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1, getExtension(filepath1));
  const data2 = readFile(filepath2, getExtension(filepath2));
  const difference = getDiff(data1, data2);
  console.log(stringify(difference));
  return stringify(difference);
};

export default genDiff;
