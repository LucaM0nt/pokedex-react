import { useEffect } from "react";

/**
 * Custom hook per gestire i click al di fuori di un elemento
 * @param {React.RefObject} ref - Riferimento all'elemento da monitorare
 * @param {Function} handler - Callback da eseguire al click fuori
 */
export default function useClickOutside(ref, handler) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, handler]);
}
