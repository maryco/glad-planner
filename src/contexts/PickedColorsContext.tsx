import { ReactNode, createContext, useContext, useReducer } from 'react'

// https://ja.react.dev/learn/scaling-up-with-reducer-and-context

export type Color = {
  uuid: string
  hex: string
  order: number
}

const setInitialColor = (colors: string[], index: number, fallBack: string) => {
  return colors.length >= index + 1 && isValidColorHex(colors[index])
    ? `#${colors[index]}`
    : fallBack
}

const isValidColorHex = (value: string): boolean => {
  return value !== undefined && /^([0-9A-F]{2}){3}$/gi.test(value)
}

const searchParams = new URLSearchParams(window.location.search)
const colorParams = searchParams.getAll('color')
const initialPickedColors = [
  { uuid: '1', hex: setInitialColor(colorParams, 0, '#f9fafb'), order: 0 },
  { uuid: '2', hex: setInitialColor(colorParams, 1, '#f3f4f6'), order: 1 },
  { uuid: '3', hex: setInitialColor(colorParams, 2, '#e5e7eb'), order: 2 },
  { uuid: '4', hex: setInitialColor(colorParams, 3, '#d1d5db'), order: 3 },
  { uuid: '5', hex: setInitialColor(colorParams, 4, '#9ca3af'), order: 4 },
]

export const PickedColorsContext = createContext<Color[]>(initialPickedColors)
export const PickedColorsDispatchContext =
  createContext<React.Dispatch<Action> | null>(null)

// https://stackoverflow.com/questions/55370851/how-to-fix-binding-element-children-implicitly-has-an-any-type-ts7031
interface Props {
  // any props that come into the component
  children?: ReactNode
}

export function usePickedColors() {
  return useContext(PickedColorsContext)
}

export function usePickedColorsDispatch() {
  return useContext(PickedColorsDispatchContext)
}

export function PickedColorsProvider({ children }: Props) {
  const [pickedColors, dispatch] = useReducer(
    pickedColorsReducer,
    initialPickedColors
  )

  return (
    <PickedColorsDispatchContext.Provider value={dispatch}>
      <PickedColorsContext.Provider value={pickedColors}>
        {children}
      </PickedColorsContext.Provider>
    </PickedColorsDispatchContext.Provider>
  )
}

type Action = {
  type: 'changed'
  id: string
  colorValue: string
}

function pickedColorsReducer(pickedColors: Color[], action: Action): Color[] {
  switch (action.type) {
    case 'changed': {
      return pickedColors.map((p) =>
        p.uuid === action.id
          ? { uuid: action.id, hex: action.colorValue, order: p.order }
          : p
      )
    }
    default: {
      throw Error(`Unknown action: ${action ? action.type : 'unknown'}`)
    }
  }
}
