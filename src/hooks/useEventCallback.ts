import { useRef } from "react";

// https://github.com/omgovich/react-colorful/blob/master/src/hooks/useEventCallback.ts
// Saves incoming handler to the ref in order to avoid "useCallback hell"
export function useEventCallback<T>(handler?: (value: T) => void): (value: T) => void {
  const callbackRef = useRef(handler);
  const fn = useRef((value: T) => {
    callbackRef.current && callbackRef.current(value);
  });
  callbackRef.current = handler;

  return fn.current;
}