import { ReactComponent as IconCheckCircle } from '@/assets/icon_check_circle.svg'
import { Tooltip } from '@/components/Tooltip'
import { usePickedColors } from '@/contexts/usePickedColorsContext'

export function CopyAsUrlButton() {
  const pickedColors = usePickedColors()

  function copyAsUrl(): void {
    const baseUrl =
      import.meta.env.MODE === 'demo'
        ? import.meta.env.BASE_URL
        : window.location.origin
    navigator.clipboard
      .writeText(
        `${baseUrl}/?` +
          pickedColors.map((p) => `color=${p.hex.replace('#', '')}`).join('&')
      )
      .catch((e) => console.error(e))
  }

  return (
    <>
      <Tooltip
        message={'URL Copied!'}
        positionClass={'top-2 -right-20'}
      >
        <button onClick={copyAsUrl} aria-label="Copy all colors as url">
          <IconCheckCircle width={40} height={40} fill={'#94a3b8'} />
        </button>
      </Tooltip>
    </>
  )
}
