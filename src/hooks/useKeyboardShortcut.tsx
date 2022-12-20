import { useEffect } from 'react';

export function useKeyboardShortcut(
  expression: (event: KeyboardEvent) => boolean,
  callback: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (expression(event)) {
        callback(event);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
}
