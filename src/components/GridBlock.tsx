import Konva from 'konva'
import { useEffect, useRef } from 'react'
import { Group, Rect } from 'react-konva'

export const DEFAULT_GRID_SIZE = 16

export type GridBlockProp = {
  oddColors: string[]
  evenColors: string[]
  gridSize?: number
}

type RectProps = {
  x: number
  y: number
}

type Props = {
  gridBlockProp: GridBlockProp
  positionX: number
  exportImage: CallableFunction
}

function GridBlock(props: Props) {
  const {
    oddColors,
    evenColors,
    gridSize = DEFAULT_GRID_SIZE,
  } = props.gridBlockProp
  const { exportImage, positionX } = props

  const blocks = [0, 1, 2, 3].map((row) => {
    return [0, 1, 2, 3].map(
      (col) =>
        ({
          x: col * gridSize,
          y: row * gridSize,
        } as RectProps)
    )
  })

  const blockGroupRef = useRef<Konva.Group>(null)
  useEffect(() => {
    const canvas = blockGroupRef.current
    exportImage(canvas?.toDataURL())
  }, [exportImage, oddColors, evenColors])

  return (
    <>
      <Group x={positionX} ref={blockGroupRef}>
        {blocks.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Rect
              key={`grid${positionX}-${col.x}-${col.y}`}
              x={col.x}
              y={col.y}
              width={gridSize}
              height={gridSize}
              fill={
                rowIndex % 2 === 0 ? evenColors[colIndex] : oddColors[colIndex]
              }
            />
          ))
        )}
      </Group>
    </>
  )
}

export default GridBlock
