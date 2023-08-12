import { MutableRefObject, useEffect } from "react";

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  refs: Array<MutableRefObject<T | null>>,
  handler: (entries: ResizeObserverEntry[]) => void
) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      handler(entries)
    })

    for (const ref of refs) {
      ref.current && resizeObserver.observe(ref.current)
    }

    return () => resizeObserver.disconnect()
  }, [refs, handler])
}