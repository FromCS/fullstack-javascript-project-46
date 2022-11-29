import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath, extension) => {
  const absolutePath = getAbsolutePath(filepath);
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(readFileSync(filepath));
  }

  return JSON.parse(readFileSync(absolutePath));
};

export default readFile;
