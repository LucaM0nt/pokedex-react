import { useEffect } from "react";

/**
 * useClickOutside
 * Triggers a handler when user clicks outside the referenced element.
 * @param {React.RefObject} ref - Element reference to monitor
 * @param {Function} handler - Callback executed on outside click
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
