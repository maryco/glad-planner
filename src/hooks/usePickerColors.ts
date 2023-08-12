import { Dispatch, SetStateAction, useId, useState } from "react"

export type Color = {
  uuid: string
  hex: string
  order: number
}

export interface UsePickerColors {
  pickerColors: Color[]
  setPickerColors: Dispatch<SetStateAction<Color[]>>
  copyAsUrl: () => void
}

const setInitialColor = (colors: string[], index: number, fallBack: string) => {
  return colors.length >= index + 1 && isValidColorHex(colors[index]) ? `#${colors[index]}` : fallBack
}

const isValidColorHex = (value: string): boolean => {
  return value !== undefined && /^([0-9A-F]{2}){3}$/gi.test(value)
}

export function usePickerColors(initialColors: string[]): UsePickerColors {
  const [pickerColors, setPickerColors] = useState<Color[]>([
    { uuid: useId(), hex: setInitialColor(initialColors, 0, '#f9fafb'), order: 0 },
    { uuid: useId(), hex: setInitialColor(initialColors, 1, '#f3f4f6'), order: 1 },
    { uuid: useId(), hex: setInitialColor(initialColors, 2, '#e5e7eb'), order: 2 },
    { uuid: useId(), hex: setInitialColor(initialColors, 3, '#d1d5db'), order: 3 },
    { uuid: useId(), hex: setInitialColor(initialColors, 4, '#9ca3af'), order: 4 },
  ])

  const copyAsUrl = (): void => {
    navigator.clipboard.writeText(`${window.location.origin}/?` + pickerColors.map(p => `color=${p.hex.replace('#', '')}`).join('&'))
      .catch(e => console.error(e))
  }

  return {
    pickerColors: pickerColors,
    setPickerColors: setPickerColors,
    copyAsUrl: copyAsUrl
  }
}