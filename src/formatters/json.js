import _ from 'lodash';
import {
  getStatus, getKey, getValue, getOldValue, getNewValue, getChildren,
} from '../utils';

const makeDoubleQuotes = (value) => ((typeof value === 'string')
  ? `"${value}"`
  : value);

const makeJson = (diffs) => {
  if (!_.isObject(diffs)) {
    return `${makeDoubleQuotes(diffs)}`;
  }
  if (!Array.isArray(diffs)) {
    const entries = Object.entries(diffs);
    const result = entries.map(([key, value]) => [[`"${key}":${makeJson(value)}`]]);
    return `[{${_.flatten(result).join(',')}}]`;
  }
  const json = diffs.map((node) => {
    switch (getStatus(node)) {
      case 'nested':
        return [[`"${getKey(node)}":${makeJson(getChildren(node))}`]];
      case 'added':
        return [[`"+ ${getKey(node)}":${makeJson(getValue(node))}`]];
      case 'deleted':
        return [[`"- ${getKey(node)}":${makeJson(getValue(node))}`]];
      case 'changed':
        return [[`"- ${getKey(node)}":${makeJson(getOldValue(node))}`],
          [`"+ ${getKey(node)}":${makeJson(getNewValue(node))}`]];
      default:
        return [[`"${getKey(node)}":${makeJson(getValue(node))}`]];
    }
  });
  return `[{${_.flatten(json).join(',')}}]`;
};

export default makeJson;
