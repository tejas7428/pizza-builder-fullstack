import { useState, useRef, useEffect } from 'react';

const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, []);

  const focus = () => {
    ref.current && ref.current.focus();
  };

  const blur = () => {
    ref.current && ref.current.blur();
  };

  return [ref, isFocused, { focus, blur }];
};

export default useFocus;