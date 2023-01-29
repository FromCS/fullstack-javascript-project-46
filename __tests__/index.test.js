import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const extensions = ['json', 'yml'];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const stylishResult = readFile('expected_file_stylish.txt');
const plainResult = readFile('expected_file_plain.txt');
const jsonResult = readFile('expected_file_json.txt');

test.each(extensions)('gendiff %s', (extension) => {
  const fileBefore = `./__fixtures__/file1.${extension}`;
  const fileAfter = `./__fixtures__/file2.${extension}`;
  expect(genDiff(fileBefore, fileAfter)).toBe(stylishResult);
  expect(genDiff(fileBefore, fileAfter, 'stylish')).toBe(stylishResult);
  expect(genDiff(fileBefore, fileAfter, 'plain')).toBe(plainResult);
  expect(genDiff(fileBefore, fileAfter, 'json')).toBe(jsonResult);
});
