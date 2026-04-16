import { useState } from 'react';

const useArrayState = (initialValue = []) => {
  const [array, setArray] = useState(initialValue);

  const push = (element) => {
    setArray(prev => [...prev, element]);
  };

  const filter = (callback) => {
    setArray(prev => prev.filter(callback));
  };

  const update = (index, newElement) => {
    setArray(prev => prev.map((element, i) => (i === index ? newElement : element)));
  };

  const remove = (index) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    setArray([]);
  };

  const isEmpty = () => {
    return array.length === 0;
  };

  return [array, { push, filter, update, remove, clear, isEmpty }];
};

export default useArrayState;