import _ from 'lodash';
import path from 'path';
import readFile from './parsers.js';

const stringify = (obj, replacer = ' ', spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const keys = Object.entries(currentValue);
    const newSpaceCount = spaceCount * depth;
    const result = keys.map(([key, value]) => {
      const indent = key.startsWith('+') || key.startsWith('-')
        ? replacer.repeat(newSpaceCount - 2)
        : replacer.repeat(newSpaceCount);
      return `${indent}${key}: ${iter(value, depth + 1)}`;
    });
    const bracketIndent = newSpaceCount - spaceCount;
    return `{\n${result.join('\n')}\n${replacer.repeat(bracketIndent)}}`;
  };

  return iter(obj, 1);
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
