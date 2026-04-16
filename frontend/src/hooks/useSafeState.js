import { useState, useCallback } from 'react';
import useIsMounted from './useIsMounted';

const useSafeState = (initialState) => {
  const isMounted = useIsMounted();
  const [state, setState] = useState(initialState);

  const setSafeState = useCallback((newState) => {
    if (isMounted) {
      setState(newState);
    }
  }, [isMounted]);

  return [state, setSafeState];
};

export default useSafeState;