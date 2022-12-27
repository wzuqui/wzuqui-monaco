import { useEffect } from 'react';

/**
 * Este é um hook personalizado usado para detectar cliques fora de um elemento especificado na página.
 * @example
 * ```js
 * import { useRef, useState } from 'react';
 * import { useClickOutside } from './useClickOutside';
 *
 * function MyComponent() {
 *   const ref = useRef(null);
 *   const [aberto, setAberto] = useState(false);
 *
 *   useClickOutside(ref, () => setAberto(false), aberto);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setAberto(!aberto)}>Toggle menu</button>
 *       {aberto && (
 *         <div ref={ref}>
 *           <ul>
 *             <li>Menu item 1</li>
 *             <li>Menu item 2</li>
 *             <li>Menu item 3</li>
 *           </ul>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useClickOutside(ref: any, callback: () => void, active: boolean) {
  function handleClick(event: { target: any }) {
    if (active && ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }

  useEffect(() => {
    if (active) {
      document.addEventListener('click', handleClick);
      document.addEventListener('contextmenu', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    };
  }, [active]);
}
