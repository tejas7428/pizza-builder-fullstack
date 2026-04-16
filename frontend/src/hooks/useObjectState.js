import { useState } from 'react';

const useObjectState = (initialValue = {}) => {
  const [state, setState] = useState(initialValue);

  const update = (key, value) => {
    setState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateMultiple = (updates) => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  };

  const remove = (key) => {
    setState(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };

  const clear = () => {
    setState({});
  };

  return [state, { update, updateMultiple, remove, clear }];
};

export default useObjectState;