// реализовать выбор форматтера с зависимости от значения параметра функции
import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const stringify = (obj, formatter) => {
  switch (formatter) {
    case 'stylish':
      return makeStylish(obj);

    case 'plain':
      return makePlain(obj);

    case 'json':
      return makeJson(obj);

    default:
      throw new Error("Unexpected format's name! Please, check yourself.");
  }
};

export default stringify;
