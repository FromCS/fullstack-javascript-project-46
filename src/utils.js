const getStatus = (node) => node.status;

const getKey = (node) => node.key;

const getValue = (node) => node.value;

const getOldValue = (node) => node.oldValue;

const getNewValue = (node) => node.newValue;

const getChildren = (node) => node.children;

export {
  getStatus, getKey, getValue, getOldValue, getNewValue, getChildren,
};
