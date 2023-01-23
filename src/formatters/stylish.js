import _ from 'lodash';
import {
  getStatus, getKey, getValue, getOldValue, getNewValue, getChildren,
} from '../utils.js';

const primeReplacer = ' ';

const primeSpaceCount = 4;

const makeStylishRaw = (obj, depth, replacer = primeReplacer, spaceCount = primeSpaceCount) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const indent = replacer.repeat(spaceCount * depth - 2);
  const result = entries.map(([key, value]) => `${indent}  ${key}: ${makeStylishRaw(value, depth + 1)}`);
  const bracketIndent = replacer.repeat(spaceCount * depth - spaceCount);
  return `{\n${result.join('\n')}\n${bracketIndent}}`;
};

const makeStylish = (diffs, replacer = primeReplacer, spaceCount = primeSpaceCount) => {
  const iter = (currentValue, depth) => {
    const newSpaceCount = spaceCount * depth;
    const indent = replacer.repeat(newSpaceCount - 2);
    const result = currentValue.map((node) => {
      switch (getStatus(node)) {
        case 'nested':
          return `${indent}  ${getKey(node)}: ${iter(getChildren(node), depth + 1)}`;
        case 'added':
          return `${indent}+ ${getKey(node)}: ${makeStylishRaw(getValue(node), depth + 1)}`;
        case 'changed':
          return [`${indent}- ${getKey(node)}: ${makeStylishRaw(getOldValue(node), depth + 1)}`,
            `${indent}+ ${getKey(node)}: ${makeStylishRaw(getNewValue(node), depth + 1)}`].join('\n');
        case 'deleted':
          return `${indent}- ${getKey(node)}: ${makeStylishRaw(getValue(node), depth + 1)}`;
        default:
          return `${indent}  ${getKey(node)}: ${makeStylishRaw(getValue(node), depth + 1)}`;
      }
    });
    const bracketIndent = replacer.repeat(newSpaceCount - spaceCount);
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(diffs, 1);
};

export default makeStylish;
