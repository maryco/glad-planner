import { useEffect, useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'

import GridBlock, { GridBlockProp } from '@/components/GridBlock'
import { usePickedColors } from '@/contexts/usePickedColorsContext'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import makeGridPatterns from '@/utils/makeGridPattern'

type Props = {
  exportImageHandlers: CallableFunction[]
}

function GridContainer(props: Props) {
  const GAP_OF_BLOCKS = 90
  const [stageWidth, setStageWidth] = useState(0)
  const [stageHeight, setStageHeight] = useState(0)
  const [gridBlocks, setGridBlocks] = useState<GridBlockProp[]>([])

  const pickedColors = usePickedColors();
  useEffect(() => {
    setGridBlocks(makeGridPatterns(pickedColors.map((color) => color.hex)))
  }, [pickedColors])

  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleResize = (entries: ResizeObserverEntry[]) => {
    const width = entries[0].contentRect.width
    const height = entries[0].contentRect.height
    setStageWidth(width)
    setStageHeight(height)
  }

  useResizeObserver([containerRef], handleResize)

  return (
    <>
      <div className="h-20" ref={containerRef}>
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            {gridBlocks.map((item, index) => (
              <GridBlock
                key={index}
                gridBlockProp={item}
                positionX={index * GAP_OF_BLOCKS}
                exportImage={props.exportImageHandlers[index]}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </>
  )
}

export default GridContainer
