import path from 'path';
import { readFileSync } from 'fs';
import getParsedContent from './parsers.js';
import getFormattedContent from './formatters/index.js';
import makeDiff from './makeDiff.js';

const getExtension = (filepath) => path.extname(filepath);

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const firstFileAbsolutePath = getAbsolutePath(filepath1);
  const secondFileAbsolutePath = getAbsolutePath(filepath2);
  const data1 = getParsedContent(readFileSync(firstFileAbsolutePath), getExtension(filepath1));
  const data2 = getParsedContent(readFileSync(secondFileAbsolutePath), getExtension(filepath2));
  return getFormattedContent(makeDiff(data1, data2), formatter);
};

export default genDiff;
