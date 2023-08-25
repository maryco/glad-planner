import classNames from 'classnames'
import { useState } from 'react'
import { styled } from 'styled-components'

import { ReactComponent as IconFrameReload } from '@/assets/icon_frame_reload.svg'
import ColorPickerButton from '@/components/ColorPickerButton'
import GridContainer from '@/components/GridContainer'
import {
  PickedColorsProvider
} from '@/contexts/PickedColorsContext'

import { CopyAsUrlButton } from '@/components/CopyAsUrlButton'
import { usePickedColors } from '@/contexts/usePickedColorsContext'

type GradationPlateProps = {
  $backgroundUrl: string | null | undefined
}
const GradationPlate = styled.div<GradationPlateProps>`
  width: 100%;
  flex-grow: 1;
  background-image: url(${(props) => props.$backgroundUrl || ''});
  background-size: 20px;
`

function App() {
  const pickedColors = usePickedColors()

  const [gridImage1, setGridImage1] = useState<string | null>()
  const [gridImage2, setGridImage2] = useState<string | null>()
  const [gridImage3, setGridImage3] = useState<string | null>()
  const [gridImage4, setGridImage4] = useState<string | null>()
  const [gridImage5, setGridImage5] = useState<string | null>()
  const [gridImage6, setGridImage6] = useState<string | null>()
  const [gridImage7, setGridImage7] = useState<string | null>()
  const [gridImage8, setGridImage8] = useState<string | null>()
  const [gridImage9, setGridImage9] = useState<string | null>()

  const [previewVerticalState, setPreviewDirectionState] =
    useState<boolean>(true)

  const setGridImages = Array.of(
    setGridImage1,
    setGridImage2,
    setGridImage3,
    setGridImage4,
    setGridImage5,
    setGridImage6,
    setGridImage7,
    setGridImage8,
    setGridImage9
  )

  const gridImages = Array.of(
    gridImage1,
    gridImage2,
    gridImage3,
    gridImage4,
    gridImage5,
    gridImage6,
    gridImage7,
    gridImage8,
    gridImage9
  )

  const previewContainerClasses = classNames('flex-grow flex h-auto w-full', {
    'flex-col': previewVerticalState,
    'flex-row': !previewVerticalState,
  })

  return (
    <>
      <div className="flex flex-col h-screen w-full print:h-[1500px]">
        <div className={previewContainerClasses}>
          {gridImages.map((gridImage, index) => (
            <GradationPlate key={index} $backgroundUrl={gridImage} />
          ))}
        </div>
        <PickedColorsProvider>
          <div className="w-full p-4 bg-gray-200">
            <GridContainer exportImageHandlers={setGridImages} />
            <ul className="flex gap-4">
              {pickedColors
                .sort((a, b) => a.order - b.order)
                .map((color) => (
                  <li
                    key={color.uuid}
                    className="relative w-10 h-10"
                    aria-colindex={color.order}
                  >
                    <ColorPickerButton id={color.uuid} />
                  </li>
                ))}
              <li className="w-10 h-10"></li>
              <li className="w-10 h-10">
                <button
                  onClick={() =>
                    setPreviewDirectionState(!previewVerticalState)
                  }
                  aria-label="Switch orientation"
                >
                  <IconFrameReload width={40} height={40} fill={'#94a3b8'} />
                </button>
              </li>
              <li className="relative w-10 h-10">
                <CopyAsUrlButton />
              </li>
            </ul>
          </div>
        </PickedColorsProvider>
      </div>
    </>
  )
}

export default App
