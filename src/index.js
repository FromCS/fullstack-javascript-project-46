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
    return acc;
  }

  if (!_.has(data2, key)) {
    acc[`- ${key}`] = value1;
    return acc;
  }

  if (value1 === value2) {
    acc[key] = value2;
    return acc;
  }
  acc[`- ${key}`] = value1;
  acc[`+ ${key}`] = value2;
  return acc;
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = readFile(filepath1, getExtension(filepath1));
  const data2 = readFile(filepath2, getExtension(filepath2));
  const iter = (currentData1, currentData2) => {
    const sortedGeneralKeys = getSortedKeysByName(currentData1, currentData2);
    const difference = sortedGeneralKeys.map((key) => {
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
