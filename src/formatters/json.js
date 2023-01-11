import _ from 'lodash';

const makeDoubleQuotes = (value) => ((typeof value === 'string')
  ? `"${value}"`
  : value);

const makeJson = (obj) => {
  const iter = (currentValue) => {
    const json = currentValue.map(([key, value]) => (_.isObject(value)
      ? [`"${key}":${iter(value)}`]
      : [`"${key}":${makeDoubleQuotes(value)}`]));

    return `[{${json.join(',')}}]`;
  };

  return iter(obj);
};

export default makeJson;
