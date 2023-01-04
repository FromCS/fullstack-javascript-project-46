// реализовать выбор форматтера с зависимости от значения параметра функции
import makeStylish from './stylish.js';
import makePlain from './plain.js';

const chooseFormatters = (formatter) => {
  switch (formatter) {
    case 'stylish':
      return makeStylish;

    case 'plain':
      return makePlain;

    default:
      throw new Error('Unexpected format name! Please, check yourself.');
  }
};

export default chooseFormatters;
