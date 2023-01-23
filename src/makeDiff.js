import _ from 'lodash';

const compareObjects = (key, data, values) => {
  const [value1, value2] = values;
  const [data1, data2] = data;
  if (!_.has(data1, key)) {
    return { key, status: 'added', value: value2 };
  }

  if (!_.has(data2, key)) {
    return { key, status: 'deleted', value: value1 };
  }

  if (value1 !== value2) {
    return {
      key, status: 'changed', oldValue: value1, newValue: value2,
    };
  }

  return { key, status: 'unchanged', value: value1 };
};

const makeDiff = (data1, data2) => {
  const sortedKeysByName = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const treeOfDiff = sortedKeysByName.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'nested', children: makeDiff(value1, value2) };
    }
    return compareObjects(key, [data1, data2], [value1, value2]);
  });

  return treeOfDiff;
};

export default makeDiff;
