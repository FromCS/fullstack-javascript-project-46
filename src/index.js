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
  console.log(stringify(makeDiff(data1, data2), formatter));
  return stringify(makeDiff(data1, data2), formatter);
};

export default genDiff;
