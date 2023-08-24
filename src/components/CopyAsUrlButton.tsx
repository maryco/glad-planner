import { usePickedColors } from '@/contexts/PickedColorsContext'
import { useState } from 'react'
import { Tooltip } from '@/components/Tooltip'
import { ReactComponent as IconCheckCircle } from '@/assets/icon_check_circle.svg'

export function CopyAsUrlButton() {
  const pickedColors = usePickedColors()
  const [isCopiedState, setIsCopiedState] = useState<boolean>(false)

  function copyAsUrl(): void {
    const baseUrl =
      import.meta.env.MODE === 'demo'
        ? import.meta.env.BASE_URL
        : window.location.origin
    console.log(pickedColors)
    navigator.clipboard
      .writeText(
        `${baseUrl}/?` +
          pickedColors.map((p) => `color=${p.hex.replace('#', '')}`).join('&')
      )
      .catch((e) => console.error(e))
  }

  function snapshot() {
    copyAsUrl()
    setIsCopiedState(true)
    setTimeout(() => {
      setIsCopiedState(false)
    }, 700)
  }

  return (
    <>
      <Tooltip
        message={'URL Copied!'}
        positionClass={'top-2 -right-20'}
        visible={isCopiedState}
      />
      <button onClick={snapshot} aria-label="Copy all colors as url">
        <IconCheckCircle width={40} height={40} fill={'#94a3b8'} />
      </button>
    </>
  )
}
