import yaml from 'js-yaml';

const getParsedContent = (data, extension) => {
  switch (extension) {
    case '.yml':
      return yaml.load(data);

    case '.yaml':
      return yaml.load(data);

    case '.json':
      return JSON.parse(data);

    default:
      throw new Error(`Extension ${extension} - doesn't supported`);
  }
};

export default getParsedContent;
