import _ from 'lodash';
import {
  getChildren,
  getKey, getNewValue, getOldValue, getStatus, getValue,
} from '../utils.js';

const makeQuotes = (value) => (typeof value === 'string' ? `'${value}'` : value);

const defineComplexValue = (value) => (_.isObject(value) ? '[complex value]' : makeQuotes(value));

const definePoint = ((value) => (value === '' ? '' : '.'));

const makePlain = (diffs) => {
  const iter = (currentValue, acc) => {
    const plain = currentValue.map((node) => {
      switch (getStatus(node)) {
        case 'nested':
          return iter(getChildren(node), `${acc}${definePoint(acc)}${getKey(node)}`);
        case 'added':
          return `Property '${acc}${definePoint(acc)}${getKey(node)}' was ${getStatus(node)} with value: ${defineComplexValue(getValue(node))}`;
        case 'deleted':
          return `Property '${acc}${definePoint(acc)}${getKey(node)}' was removed`;
        case 'changed':
          return `Property '${acc}${definePoint(acc)}${getKey(node)}' was updated. From ${defineComplexValue(getOldValue(node))} to ${defineComplexValue(getNewValue(node))}`;
        default:
          return '';
      }
    });

    return _.compact(plain).join('\n');
  };
  return iter(diffs, '');
};

export default makePlain;
