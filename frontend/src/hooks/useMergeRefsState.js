import { useCallback } from 'react';

const useMergeRefsState = (...refs) => {
  return useCallback((node) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  }, refs);
};

export default useMergeRefsState;