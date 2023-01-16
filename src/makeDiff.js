import _ from 'lodash';

const getArrFromObj = (obj) => {
  if (_.isObject(obj)) {
    const entries = Object.entries(obj);
    const array = entries.map(([key, value]) => (_.isObject(value)
      ? [key, getArrFromObj(value)]
      : [key, value]));
    return array;
  }
  return obj;
};

const makeDiff = (key, values, data) => {
  const [value1, value2] = values;
  const [data1, data2] = data;
  if (!_.has(data1, key)) {
    return [[`+ ${key}`, getArrFromObj(value2)]];
  }

  if (!_.has(data2, key)) {
    return [[`- ${key}`, getArrFromObj(value1)]];
  }

  if (value1 === value2) {
    return [[key, getArrFromObj(value1)]];
  }
  return [[`- ${key}`, getArrFromObj(value1)], [`+ ${key}`, getArrFromObj(value2)]];
};

export default makeDiff;
