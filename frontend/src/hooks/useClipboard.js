import { useState } from 'react';

const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      setError(err);
      setCopied(false);
      return false;
    }
  };

  const read = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setError(null);
      return text;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  return {
    copied,
    error,
    copy,
    read
  };
};

export default useClipboard;