const makeStylish = (diffs, replacer = ' ', spaceCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!Array.isArray(currentValue)) {
      return `${currentValue}`;
    }
    const newSpaceCount = spaceCount * depth;
    const result = currentValue.map(([key, value]) => {
      const indent = key.startsWith('+') || key.startsWith('-')
        ? replacer.repeat(newSpaceCount - 2)
        : replacer.repeat(newSpaceCount);
      return `${indent}${key}: ${iter(value, depth + 1)}`;
    });
    const bracketIndent = replacer.repeat(newSpaceCount - spaceCount);
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };

  return iter(diffs, 1);
};

export default makeStylish;
