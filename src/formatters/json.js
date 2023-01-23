import _ from 'lodash';
import {
  getStatus, getKey, getValue, getOldValue, getNewValue, getChildren,
} from '../utils.js';

const makeDoubleQuotes = (value) => ((typeof value === 'string')
  ? `"${value}"`
  : value);

const makeJsonRaw = (rawValue) => {
  if (!_.isObject(rawValue)) {
    return `${makeDoubleQuotes(rawValue)}`;
  }
  const entries = Object.entries(rawValue);
  const json = entries.map(([key, value]) => [[`"${key}":${makeJsonRaw(value)}`]]);
  return `[{${_.flatten(json).join(',')}}]`;
};

const makeJson = (diffs) => {
  const json = diffs.map((node) => {
    switch (getStatus(node)) {
      case 'nested':
        return [[`"${getKey(node)}":${makeJson(getChildren(node))}`]];
      case 'added':
        return [[`"+ ${getKey(node)}":${makeJsonRaw(getValue(node))}`]];
      case 'deleted':
        return [[`"- ${getKey(node)}":${makeJsonRaw(getValue(node))}`]];
      case 'changed':
        return [[`"- ${getKey(node)}":${makeJsonRaw(getOldValue(node))}`],
          [`"+ ${getKey(node)}":${makeJsonRaw(getNewValue(node))}`]];
      default:
        return [[`"${getKey(node)}":${makeJsonRaw(getValue(node))}`]];
    }
  });
  return `[{${_.flatten(json).join(',')}}]`;
};

export default makeJson;
