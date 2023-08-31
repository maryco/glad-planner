import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { styled } from 'styled-components'

import { ReactComponent as IconCopy } from '@/assets/icon_content_copy.svg'
import { Tooltip } from '@/components/Tooltip'
import { usePickedColors, usePickedColorsDispatch } from '@/contexts/usePickedColorsContext'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useDebounce } from '@/hooks/useDebounce'

type PickerButtonProps = {
  $bgcolor?: string
}
const PickerButton = styled.button<PickerButtonProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: ${(props) => props.$bgcolor || ''};
`
PickerButton.defaultProps = { $bgcolor: '#ffffff' }

type Props = {
  id: string
}

const ColorPickerButton = function ColorPickerButton(props: Props) {
  const { id } = props
  const dispatch = usePickedColorsDispatch()
  const pickedColors = usePickedColors()

  const [pickerState, setPickerState] = useState<boolean>(false)
  const [pickedColor, setPickedColor] = useState<string>(pickedColors.filter((c) => c.id === id)[0].hex)
  const pickedColorDebounced = useDebounce<string>(pickedColor, 600)
  const [invertedColor, setInvertedColor] = useState<string>()
  const pickerClasses = classNames({
    'absolute z-10 bottom-12': true,
    'opacity-1 transition-all ease-out duration-300': pickerState,
    'opacity-0 scale-0 origin-bottom-left': !pickerState,
  })
  const pickerRef = useRef(null)

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'changed', id: id, colorValue: pickedColorDebounced })
    }
  }, [pickedColorDebounced, id, dispatch])

  const updateColor = (newColor: string) => {
    setPickedColor(newColor)
    setInvertedColor(invertedHexColor(newColor))
  }

  useClickOutside(pickerRef, closePicker)

  function closePicker() {
    setPickerState(false)
  }

  function copyCurrentColor(): void {
    navigator.clipboard
      .writeText(pickedColor)
      .catch((e) => console.error(e))
  }

  const invertedHexColor = (hexColor: string) => {
    const colorHex = hexColor.replace('#', '')
    return Array.of(0, 2, 4).reduce((invertedHex, i) => {
      const decimal = parseInt(colorHex.slice(i, i + 2), 16)
      if (decimal < 256) {
        return invertedHex + Math.abs(255 - decimal).toString(16)
      } else {
        return invertedHex + '00'
      }
    }, '#')
  }

  return (
    <>
      <div className={pickerClasses} ref={pickerRef} aria-label="Color Picker">
        <HexColorPicker color={pickedColor} onChange={updateColor} />
      </div>
      <div className="h-full">
        <PickerButton
            $bgcolor={pickedColorDebounced}
            onClick={() => setPickerState(!pickerState)}
            aria-label="Open color picker"
          />
        <Tooltip
          message={`Copied! ${pickedColor}`}
          positionClass={'-top-8 left-0'}
        >
          <span
            className="absolute right-0.5 bottom-1 opacity-50 cursor-pointer"
            onClick={copyCurrentColor}
            aria-label="Copy color of hex"
          >
            <IconCopy width={16} height={16} fill={invertedColor} />
          </span>
        </Tooltip>
      </div>
    </>
  )
}

export default ColorPickerButton
