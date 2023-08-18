import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { HexColorPicker } from 'react-colorful'
import { useClickOutside } from '@/hooks/useClickOutside'
import classNames from 'classnames'
import { ReactComponent as IconCopy } from '@/assets/icon_content_copy.svg'
import { Tooltip } from '@/components/Tooltip'

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
  color: string
  onChangeHandler: (id: string, color: string) => void
}

function ColorPickerButton(props: Props) {
  const { id, color, onChangeHandler } = props
  const [pickerState, setPickerState] = useState<boolean>(false)
  const [pickedColor, setPickedColor] = useState<string>(color)
  const [invertedColor, setInvertedColor] = useState<string>()
  const pickerRef = useRef(null)
  const [isCopiedState, setIsCopiedState] = useState<boolean>(false)

  const pickerClasses = classNames({
    'absolute z-10 bottom-12': true,
    'opacity-1 transition-all ease-out duration-300': pickerState,
    'opacity-0 scale-0 origin-bottom-left': !pickerState,
  })

  // TODO: https://ja.react.dev/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect
  // https://ja.react.dev/reference/react/experimental_useEffectEvent
  // const onPickerClosed = useEffectEvent
  useEffect(() => {
    if (!pickerState) {
      setInvertedColor(invertedHexColor(pickedColor))
      onChangeHandler(id, pickedColor)
    }
    // https://kinsta.com/knowledgebase/react-hook-useeffect-has-a-missing-dependency/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerState])

  useClickOutside(pickerRef, closePicker)

  function closePicker() {
    setPickerState(false)
  }

  function copyCurrentColor(): void {
    setIsCopiedState(true)
    navigator.clipboard
      .writeText(pickedColor)
      .then(() =>
        setTimeout(() => {
          setIsCopiedState(false)
        }, 700)
      )
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
      <div className={pickerClasses} ref={pickerRef}>
        <HexColorPicker color={pickedColor} onChange={setPickedColor} />
      </div>
      <div className="h-full">
        <PickerButton
          $bgcolor={pickedColor}
          onClick={() => setPickerState(!pickerState)}
          aria-label='Open color picker'
        />
        <Tooltip message={`Copied! ${pickedColor}`} positionClass={'-top-8 left-0'} visible={isCopiedState} />
        <span
          className="absolute right-0.5 bottom-1 opacity-50 cursor-pointer"
          onClick={copyCurrentColor}
          aria-label='Copy color of hex'
        >
          <IconCopy width={16} height={16} fill={invertedColor} />
        </span>
      </div>
    </>
  )
}

export default ColorPickerButton
