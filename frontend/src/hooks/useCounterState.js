import { useState } from 'react';

const useCounterState = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prev => prev + step);
  };

  const decrement = () => {
    setCount(prev => prev - step);
  };

  const reset = () => {
    setCount(initialValue);
  };

  const set = (value) => {
    setCount(value);
  };

  return [count, { increment, decrement, reset, set }];
};

export default useCounterState;