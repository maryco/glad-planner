import { RefObject, useEffect } from "react";

// https://usehooks.com/useOnClickOutside/
// https://usehooks-ts.com/react-hook/use-on-click-outside
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>, 
  handler: CallableFunction
) {
  useEffect(() => {
    let startedInside = false
    let startedWhenMounted = false

    const listener = (event: Event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return

      handler(event);
    };

    const validateEventStart = (event: Event) => {
      startedWhenMounted = ref.current !== null
      startedInside = ref.current !== null && ref.current.contains(event.target as Node)
    }

    document.addEventListener("mousedown", validateEventStart)
    document.addEventListener("touchstart", validateEventStart)
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart)
      document.removeEventListener("touchstart", validateEventStart)
      document.removeEventListener("click", listener)
    };
  }, [ref, handler])
}