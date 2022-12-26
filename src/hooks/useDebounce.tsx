import { useState, useEffect } from 'react';

export function useDebounce(
  callback: () => void,
  delay: number
): [React.Dispatch<React.SetStateAction<boolean>>, boolean] {
  const [debouncing, setDebouncing] = useState(false);

  useEffect(() => {
    if (debouncing) {
      const id = setTimeout(() => {
        callback();
        setDebouncing(false);
      }, delay);

      return () => {
        clearTimeout(id);
      };
    }
  }, [debouncing, callback, delay]);

  return [setDebouncing, debouncing];
}
