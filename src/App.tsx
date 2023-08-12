import { useId, useState } from 'react'
import { styled } from 'styled-components'
import classNames from 'classnames'
import ColorPickerButton from '@/components/ColorPickerButton'
import GridContainer from '@/components/GridContainer'
import { ReactComponent as IconFrameReload } from '@/assets/icon_frame_reload.svg'

type GradationPlateProps = {
  $bgurl: string | null | undefined
}
const GradationPlate = styled.div<GradationPlateProps>`
  width: 100%;
  flex-grow: 1;
  background-image: url(${(props) => props.$bgurl || ''});
  background-size: 20px;
`

export type Color = {
  uuid: string
  hex: string
}

export type GradationGrid = {
  id: number
  uri: string
}

function App() {
  const [color1, setColor1] = useState<Color>({ uuid: useId(), hex: '#f9fafb' })
  const [color2, setColor2] = useState<Color>({ uuid: useId(), hex: '#f3f4f6' })
  const [color3, setColor3] = useState<Color>({ uuid: useId(), hex: '#e5e7eb' })
  const [color4, setColor4] = useState<Color>({ uuid: useId(), hex: '#d1d5db' })
  const [color5, setColor5] = useState<Color>({ uuid: useId(), hex: '#9ca3af' })

  const [gridImage1, setGridImage1] = useState<string | null>()
  const [gridImage2, setGridImage2] = useState<string | null>()
  const [gridImage3, setGridImage3] = useState<string | null>()
  const [gridImage4, setGridImage4] = useState<string | null>()
  const [gridImage5, setGridImage5] = useState<string | null>()
  const [gridImage6, setGridImage6] = useState<string | null>()
  const [gridImage7, setGridImage7] = useState<string | null>()
  const [gridImage8, setGridImage8] = useState<string | null>()
  const [gridImage9, setGridImage9] = useState<string | null>()

  const [previewVerticalState, setPreviewDirectionState] = useState<boolean>(true)

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

  const setColors = Array.of(
    setColor1,
    setColor2,
    setColor3,
    setColor4,
    setColor5
  )
  function updateGrid(id: string, colorVal: string) {
    // console.log(`${id} => ${colorVal}`)
    Array.of(color1, color2, color3, color4, color5).forEach((color, index) => {
      if (color.uuid === id) {
        setColors[index]({ uuid: id, hex: colorVal })
      }
    })
  }

  const previewContainerClasses = classNames({
    'flex-grow flex h-auto w-full': true,
    'flex-col': previewVerticalState,
    'flex-row': !previewVerticalState,
  })

  return (
    <>
      <div className="flex flex-col h-screen w-full print:h-[1500px]">
        <div className={previewContainerClasses}>
          {gridImages.map((gridImage, index) => (
            <GradationPlate key={index} $bgurl={gridImage} />
          ))}
        </div>
        <div className="w-full p-4 bg-gray-200">
          <GridContainer
            colors={[color1, color2, color3, color4, color5]}
            exportImageHandlers={setGridImages}
          />
          <ul className="flex gap-4">
            {[color1, color2, color3, color4, color5].map((color) => (
              <li key={color.uuid} className="relative w-10 h-10">
                <ColorPickerButton
                  id={color.uuid}
                  color={color.hex}
                  onChangeHandler={updateGrid}
                />
              </li>
            ))}
            <li className="w-10 h-10"></li>
            <li className="w-10 h-10">
              <button onClick={() => setPreviewDirectionState(!previewVerticalState)}>
                <IconFrameReload
                  width={40}
                  height={40}
                  fill={'#94a3b8'}
                  role={'button'}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
