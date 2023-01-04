import _ from 'lodash';

const makeStylish = (obj, replacer = ' ', spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const entries = Object.entries(currentValue);
    const newSpaceCount = spaceCount * depth;
    const result = entries.map(([key, value]) => {
      const indent = key.startsWith('+') || key.startsWith('-')
        ? replacer.repeat(newSpaceCount - 2)
        : replacer.repeat(newSpaceCount);
      return `${indent}${key}: ${iter(value, depth + 1)}`;
    });
    const bracketIndent = replacer.repeat(newSpaceCount - spaceCount);
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(obj, 1);
};

export default makeStylish;
