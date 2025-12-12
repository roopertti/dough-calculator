import { Button } from '@ui';
import { useState } from 'react';
import { useDoughCalculatorContext } from '../../context/DoughCalculatorContext';

export default function CopyLinkButton() {
  const { getShareableUrl } = useDoughCalculatorContext();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = getShareableUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Reset the "Copied!" message after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  return (
    <Button variant="primary" fullWidth onClick={handleCopyLink}>
      {copied ? 'Copied!' : 'Copy Recipe Link'}
    </Button>
  );
}
