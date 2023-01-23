import _ from 'lodash';
import {
  getStatus, getKey, getValue, getOldValue, getNewValue, getChildren,
} from '../utils.js';

const getString = (obj, replacer, spaceCount, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const entries = Object.entries(obj);
  const indent = replacer.repeat(spaceCount * depth - 2);
  const result = entries.map(([key, value]) => `${indent}  ${key}: ${getString(value, replacer, spaceCount, depth + 1)}`);
  const bracketIndent = replacer.repeat(spaceCount * depth - spaceCount);
  return `{\n${result.join('\n')}\n${bracketIndent}}`;
};

const makeStylish = (diffs, replacer = ' ', spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    const newSpaceCount = spaceCount * depth;
    const indent = replacer.repeat(newSpaceCount - 2);
    const result = currentValue.map((node) => {
      switch (getStatus(node)) {
        case 'nested':
          return `${indent}  ${getKey(node)}: ${iter(getChildren(node), depth + 1)}`;
        case 'added':
          return `${indent}+ ${getKey(node)}: ${getString(getValue(node), replacer, spaceCount, depth + 1)}`;
        case 'changed':
          return [`${indent}- ${getKey(node)}: ${getString(getOldValue(node), replacer, spaceCount, depth + 1)}`,
            `${indent}+ ${getKey(node)}: ${getString(getNewValue(node), replacer, spaceCount, depth + 1)}`].join('\n');
        case 'deleted':
          return `${indent}- ${getKey(node)}: ${getString(getValue(node), replacer, spaceCount, depth + 1)}`;
        default:
          return `${indent}  ${getKey(node)}: ${getString(getValue(node), replacer, spaceCount, depth + 1)}`;
      }
    });
    const bracketIndent = replacer.repeat(newSpaceCount - spaceCount);
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(diffs, 1);
};

export default makeStylish;
