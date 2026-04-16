import { useState } from 'react';

const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(count + step);
  };

  const decrement = () => {
    setCount(count - step);
  };

  const reset = () => {
    setCount(initialValue);
  };

  const set = (value) => {
    setCount(value);
  };

  return [count, { increment, decrement, reset, set }];
};

export default useCounter;