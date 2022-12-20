import { useState, useEffect } from 'react';

export function useDebounce(
  callback: () => void,
  delay: number
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
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

  return [debouncing, setDebouncing];
}
