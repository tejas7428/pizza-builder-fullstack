import { useState, useEffect } from 'react';

const useKeyPressComboState = (targetKeys) => {
  const [keysPressed, setKeysPressed] = useState(new Set());

  useEffect(() => {
    const downHandler = ({ key }) => {
      setKeysPressed(prev => new Set(prev).add(key));
    };

    const upHandler = ({ key }) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  const isPressed = targetKeys.every(key => keysPressed.has(key));

  return isPressed;
};

export default useKeyPressComboState;