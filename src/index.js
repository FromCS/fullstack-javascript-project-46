import _ from 'lodash';
import { cwd } from 'process';
import path from 'path';
import { readFileSync } from 'fs';

const getAbsolutePath = (filepath) => path.resolve(cwd(), filepath);

const getDataFromPath = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  return JSON.parse(readFileSync(absolutePath));
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getDataFromPath(filepath1);
  const data2 = getDataFromPath(filepath2);
  const sortedGeneralKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const difference = sortedGeneralKeys.map((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return `    ${key}: ${data1[key]}`;
      }
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }

    return `  - ${key}: ${data1[key]}`;
  });
  console.log(`{\n${difference.join('\n')}\n}`);
};

export default genDiff;
