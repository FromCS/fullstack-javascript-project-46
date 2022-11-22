import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  return JSON.parse(readFileSync(absolutePath));
};

const stringify = (obj, replacer = ' ', spaceCount = 2) => {
  const entries = Object.entries(obj);
  const string = entries.map(([key, value]) => `${replacer.repeat(spaceCount)}${key}: ${value}`);
  return `{\n${string.join('\n')}\n}`;
};

const getDiff = (data1, data2) => {
  const sortedGeneralKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const difference = sortedGeneralKeys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      acc[`+ ${key}`] = data2[key];
      return acc;
    }

    if (!_.has(data2, key)) {
      acc[`- ${key}`] = data1[key];
      return acc;
    }

    if (data1[key] === data2[key]) {
      acc[`  ${key}`] = data1[key];
      return acc;
    }
    acc[`- ${key}`] = data1[key];
    acc[`+ ${key}`] = data2[key];
    return acc;
  }, {});

  return difference;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const difference = getDiff(data1, data2);
  console.log(stringify(difference));
  return stringify(difference);
};

export default genDiff;
