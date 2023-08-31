import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import 'jest-styled-components'

import ColorPickerButton from '@/components/ColorPickerButton'
import { DEFAULT_PICKED_COLORS } from '@/contexts/constants'

// https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
  clipboard: {
    // https://eslint.org/docs/latest/rules/require-await
    // Allow empty functions.
    // writeText: async function () {},
    writeText: async () => Promise.resolve(),
  },
})

// Mock `HTMLElement.getBoundingClientRect` to be able to read element sizes
// from react-colorful/tests/components.test.js
// https://github.com/omgovich/react-colorful
// https://github.com/jsdom/jsdom/issues/135#issuecomment-68191941
Object.defineProperties(HTMLElement.prototype, {
  getBoundingClientRect: {
    get: () => () => ({
      left: 5,
      top: 5,
      width: 100,
      height: 100,
    }),
  },
})

// prevent listen click event
vi.mock('@/hooks/useClickOutside', () => {
  return {
    useClickOutside: () => {},
  }
})

describe('render ColorPickerButton component', () => {
  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  test('render with default color', async () => {
    render(<ColorPickerButton id="1" />)
    await waitFor(() => screen.getByLabelText('Open color picker'))

    const button = screen.getByLabelText('Open color picker')
    expect(button).toBeInstanceOf(HTMLButtonElement)
    expect(button).toHaveStyleRule(
      'background-color',
      DEFAULT_PICKED_COLORS[0].hex
    )

    expect(screen.getByLabelText('Copy color of hex')).toBeInTheDocument()
    // Color Picker is hidden
    expect(screen.getByLabelText('Color Picker')).toHaveClass('opacity-0')
  })

  test('show/hide Color Picker by click the button', async () => {
    const user = userEvent.setup()
    render(<ColorPickerButton id="1" />)

    const button = screen.getByLabelText('Open color picker')
    // Color Picker to be appear
    await user.click(button)
    expect(await screen.findByLabelText('Color Picker')).toHaveClass(
      'opacity-1'
    )
    await user.click(button)
    expect(await screen.findByLabelText('Color Picker')).toHaveClass(
      'opacity-0'
    )
  })

  test('change Color', async () => {
    const user = userEvent.setup()
    render(<ColorPickerButton id="1" />)

    const button = screen.getByLabelText('Open color picker')
    // show Color Picker
    await user.click(button)
    // move mouse pointer and click for change color
    // NOTE: but coords: {pageX: 90, pageY: 90} always '0'
    const colorPickerColor = await screen.findByLabelText('Color')
    await user.pointer([
      { target: colorPickerColor, coords: { pageX: 90, pageY: 90 } },
      '[MouseLeft>]',
    ])
    await waitFor(() =>
      expect(button).not.toHaveStyleRule(
        'background-color',
        DEFAULT_PICKED_COLORS[0].hex
      )
    )
  })
})
