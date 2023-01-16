import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import getParsedContent from './parsers.js';
import stringify from './formatters/index.js';
import makeDiff from './makeDiff.js';

const getExtension = (filepath) => path.extname(filepath);

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const absolut1 = getAbsolutePath(filepath1);
  const absolut2 = getAbsolutePath(filepath2);
  const data1 = getParsedContent(readFileSync(absolut1), getExtension(filepath1));
  const data2 = getParsedContent(readFileSync(absolut2), getExtension(filepath2));
  const iter = (currentData1, currentData2) => {
    const sortedGeneralKeysByName = _.sortBy(Object.keys({ ...currentData1, ...currentData2 }));
    const difference = sortedGeneralKeysByName.map((key) => {
      const value1 = currentData1[key];
      const value2 = currentData2[key];
      if (_.isObject(value1) && _.isObject(value2)) {
        return [[key, iter(value1, value2)]];
      }
      return makeDiff(key, [value1, value2], [currentData1, currentData2]);
    });
    return _.flatten(difference);
  };

  console.log(stringify(iter(data1, data2), formatter));
  return stringify(iter(data1, data2), formatter);
};

export default genDiff;
