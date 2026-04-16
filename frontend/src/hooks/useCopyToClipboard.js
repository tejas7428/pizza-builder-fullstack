import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      setCopied(false);
      return false;
    }
  };

  return [copied, copy];
};

export default useCopyToClipboard;