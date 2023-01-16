import _ from 'lodash';

const makeDoubleQuotes = (value) => ((typeof value === 'string')
  ? `"${value}"`
  : value);

const makeJson = (diffs) => {
  const json = diffs.map(([key, value]) => (_.isObject(value)
    ? [`"${key}":${makeJson(value)}`]
    : [`"${key}":${makeDoubleQuotes(value)}`]));

  return `[{${json.join(',')}}]`;
};

export default makeJson;
