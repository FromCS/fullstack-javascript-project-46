import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff stylish', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(readFile('expected_file_stylish.txt'));
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yaml')).toBe(readFile('expected_file_stylish.txt'));
});

test('gendiff plain', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toBe(readFile('expected_file_plain.txt'));
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yaml', 'plain')).toBe(readFile('expected_file_plain.txt'));
});

test('gendiff json', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'json')).toBe(readFile('expected_file_json.txt'));
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yaml', 'json')).toBe(readFile('expected_file_json.txt'));
});
