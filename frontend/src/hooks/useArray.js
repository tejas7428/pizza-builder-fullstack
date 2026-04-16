import { useState } from 'react';

const useArray = (initialValue = []) => {
  const [array, setArray] = useState(initialValue);

  const push = (element) => {
    setArray([...array, element]);
  };

  const filter = (callback) => {
    setArray(array.filter(callback));
  };

  const update = (index, newElement) => {
    setArray(array.map((element, i) => (i === index ? newElement : element)));
  };

  const remove = (index) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const clear = () => {
    setArray([]);
  };

  const isEmpty = () => {
    return array.length === 0;
  };

  return [array, { push, filter, update, remove, clear, isEmpty }];
};

export default useArray;