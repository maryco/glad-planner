import { cleanup, render, screen, waitFor } from '@testing-library/react'

import ColorPickerButton from '@/components/ColorPickerButton'
import 'jest-styled-components'
import { DEFAULT_PICKED_COLORS } from '@/contexts/constants'

afterEach(cleanup)

describe('render ColorPickerButton component', () => {
  test('', async () => {
    render(<ColorPickerButton id="1" />)
    await waitFor(() => screen.getByLabelText('Open color picker'))

    const button = screen.getByLabelText('Open color picker')
    expect(button).toBeInstanceOf(HTMLButtonElement)
    expect(button).toHaveStyleRule(
      'background-color',
      DEFAULT_PICKED_COLORS[0].hex
    )

    expect(screen.getByLabelText('Copy color of hex')).toBeInstanceOf(
      HTMLSpanElement
    )
  })
})
