import { useRef, useEffect } from 'react';

const usePreviousDifferent = (value, compareFunction) => {
  const ref = useRef();
  const previousValue = useRef();

  useEffect(() => {
    if (compareFunction) {
      if (!compareFunction(previousValue.current, value)) {
        ref.current = previousValue.current;
      }
    } else {
      if (previousValue.current !== value) {
        ref.current = previousValue.current;
      }
    }
    
    previousValue.current = value;
  });

  return ref.current;
};

export default usePreviousDifferent;