import { ReactNode, createContext, useReducer } from 'react'

import { DEFAULT_PICKED_COLORS } from './constants'

// https://ja.react.dev/learn/scaling-up-with-reducer-and-context

export type Color = {
  id: string
  hex: string
  order: number
}

export type PickedColorAction = {
  type: 'changed'
  id: string
  colorValue: string
}

export const PickedColorsContext = createContext<Color[]>(DEFAULT_PICKED_COLORS)
export const PickedColorsDispatchContext =
  createContext<React.Dispatch<PickedColorAction> | null>(null)

const isValidColorHex = (value: string): boolean => {
  return value !== undefined && /^([0-9A-F]{2}){3}$/gi.test(value)
}

const getValidColor = (colors: string[], index: number, fallBack: string) => {
  return colors.length >= index + 1 && isValidColorHex(colors[index])
    ? `#${colors[index]}`
    : fallBack
}

// https://stackoverflow.com/questions/55370851/how-to-fix-binding-element-children-implicitly-has-an-any-type-ts7031
interface Props {
  // any props that come into the component
  children?: ReactNode
  initialColors: string[]
}

export function PickedColorsProvider({ children, initialColors }: Props) {
  const initialPickedColors = DEFAULT_PICKED_COLORS.map((c, index) => {
    return { ...c, hex: getValidColor(initialColors, index, c.hex) }
  })
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

function pickedColorsReducer(
  pickedColors: Color[],
  action: PickedColorAction
): Color[] {
  switch (action.type) {
    case 'changed': {
      return pickedColors.map((p) =>
        p.id === action.id &&
        isValidColorHex(action.colorValue?.replace('#', ''))
          ? { id: action.id, hex: action.colorValue, order: p.order }
          : p
      )
    }
    // https://modern-web.dev/docs/test-runner/writing-tests/code-coverage/#ignoring-uncovered-lines
    // > ignoring uncovered lines when calculating code coverage through the use of the following custom comment
    /* c8 ignore next 3 */
    default: {
      throw Error(`Unknown action: ${action ? action.type : 'unknown'}`)
    }
  }
}
