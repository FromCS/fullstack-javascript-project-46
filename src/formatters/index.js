import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const stringify = (diffs, formatter) => {
  switch (formatter) {
    case 'stylish':
      return makeStylish(diffs);

    case 'plain':
      return makePlain(diffs);

    case 'json':
      return makeJson(diffs);

    default:
      throw new Error("Unexpected format's name! Please, check yourself.");
  }
};

export default stringify;
