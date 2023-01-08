// реализовать выбор форматтера с зависимости от значения параметра функции
import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const chooseFormatters = (formatter) => {
  switch (formatter) {
    case 'stylish':
      return makeStylish;

    case 'plain':
      return makePlain;

    case 'json':
      return makeJson;

    default:
      throw new Error("Unexpected format's name! Please, check yourself.");
  }
};

export default chooseFormatters;
