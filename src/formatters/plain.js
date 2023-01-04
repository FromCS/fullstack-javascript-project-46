import _ from 'lodash';

const makePlain = (obj) => {
  const iter = (currentValue, acc) => {
    
    const entries = Object.entries(currentValue);
    const result = entries.map(([key, value], i, arr) => {
      const 
      if (arr[i + 1]) {

      }
      
      if (key.startsWith('+') || key.startsWith('-')) {
        
      }
    });
  };
  iter(obj, '');
};

export default makePlain;
