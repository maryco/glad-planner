import { useContext } from "react"

import { PickedColorsContext, PickedColorsDispatchContext } from "./PickedColorsContext"

// https://socket.dev/npm/package/eslint-plugin-react-refresh
// warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components
// react-refresh/only-export-components

export function usePickedColors() {
  return useContext(PickedColorsContext)
}

export function usePickedColorsDispatch() {
  return useContext(PickedColorsDispatchContext)
}
