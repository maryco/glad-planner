import { Color } from '@/App'
import { useResizeObserver } from '@/hooks/useResizeObserver'
import { useEffect, useRef, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import GridBlock, { GridBlockProp } from '@/components/GridBlock'
import makeGridPatterns from '@/utils/makeGridPattern'

type Props = {
  colors: Array<Color>
  exportImageHandlers: Array<CallableFunction>
}

function GridContainer(props: Props) {
  const GAP_OF_BLOCKS = 90
  const [stageWidth, setStageWidth] = useState(0)
  const [stageHeight, setStageHeight] = useState(0)
  const [gridBlocks, setGridBlocks] = useState<Array<GridBlockProp>>([])

  useEffect(() => {
    setGridBlocks(makeGridPatterns(props.colors.map((color) => color.hex)))
  }, [props.colors])

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
