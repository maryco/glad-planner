import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'

import { PickedColorsProvider } from './PickedColorsContext'
import {
  usePickedColors,
  usePickedColorsDispatch,
} from './usePickedColorsContext'

const defaultValue = [
  {
    hex: '#f9fafb',
    id: '1',
    order: 0,
  },
  {
    hex: '#f3f4f6',
    id: '2',
    order: 1,
  },
  {
    hex: '#e5e7eb',
    id: '3',
    order: 2,
  },
  {
    hex: '#d1d5db',
    id: '4',
    order: 3,
  },
  {
    hex: '#9ca3af',
    id: '5',
    order: 4,
  },
]

function wrapper({
  children,
  colors,
}: {
  children: ReactNode
  colors?: string[]
}) {
  return (
    <PickedColorsProvider initialColors={colors || []}>
      {children}
    </PickedColorsProvider>
  )
}

function ContextTest() {
  const pickedColors = usePickedColors()
  const dispatch = usePickedColorsDispatch()
  return {
    pickedColors,
    dispatch,
  }
}

describe('Test usePickedColorsContext', () => {
  test('default state', () => {
    const { result } = renderHook(() => ContextTest(), { wrapper })
    expect(result.current.pickedColors).toMatchObject(defaultValue)
  })

  test('with initial color', () => {
    // https://testing-library.com/docs/react-testing-library/api/#renderhook-options
    // > NOTE: When using renderHook in conjunction with the wrapper and initialProps options, the initialProps are not passed to the wrapper component.
    const testColors = [
      '000000',
      '111111',
      '222222',
      '333333',
      '444444',
      '555555',
    ]
    const wrapperWithProps = ({ children }: { children: ReactNode }) =>
      wrapper({ children, colors: testColors })
    const { result } = renderHook(() => ContextTest(), {
      wrapper: wrapperWithProps,
    })
    expect(result.current.pickedColors).toMatchObject(
      defaultValue.map((c, index) => ({ ...c, hex: `#${testColors[index]}` }))
    )
  })

  test('dispatch change', () => {
    const { result } = renderHook(() => ContextTest(), { wrapper })

    act(() => {
      result.current.dispatch &&
        result.current.dispatch({
          type: 'changed',
          id: '1',
          colorValue: '#000000',
        })
    })
    expect(result.current.pickedColors).toMatchObject([
      {
        hex: '#000000',
        id: '1',
        order: 0,
      },
      ...defaultValue.filter((c) => c.id !== '1'),
    ])
  })

  test('dispatch not hex color', () => {
    const { result } = renderHook(() => ContextTest(), { wrapper })

    act(() => {
      result.current.dispatch &&
        result.current.dispatch({
          type: 'changed',
          id: '1',
          colorValue: 'yellow',
        })
    })
    expect(result.current.pickedColors).toMatchObject(defaultValue)
  })
})
