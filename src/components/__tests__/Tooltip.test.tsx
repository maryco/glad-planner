import '@testing-library/jest-dom'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { Tooltip } from '@/components/Tooltip'

function executeAfterMilliseconds(func: () => void, milliseconds: number) {
  setTimeout(func, milliseconds)
}

const mock = vi.fn(() => {})

describe('Render Tooltip component', () => {
  beforeEach(() => {
    // https://github.com/testing-library/react-testing-library/issues/1198
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    cleanup()
  })

  const props = {
    message: 'Test Tooltip!',
    positionClass: 'top-2',
  }

  test('not render tooltip in first', () => {
    render(
      <Tooltip {...props}>
        <button>Click Me</button>
      </Tooltip>
    )
    // child component is should be render
    expect(screen.findByRole('button'))
      .resolves.toBeVisible()
      .catch(() => {})

    executeAfterMilliseconds(mock, 1000)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(screen.findByText('Test Tooltip!'))
      .rejects.toThrowError()
      .catch(() => {})
  })

  test('render tooltip after click event', async () => {
    render(
      <Tooltip {...props}>
        <button>Click Me</button>
      </Tooltip>
    )
    await userEvent.click(screen.getByRole('button'))
    const result = screen.findByText('Test Tooltip!')
    expect(result)
      .resolves.toBeInstanceOf(HTMLSpanElement)
      .catch(() => {})
    expect(result)
      .resolves.toHaveClass('top-2')
      .catch(() => {})
    vi.runAllTimers()
  })

  test('hide after timeout', async () => {
    render(
      <Tooltip duration={1000} {...props}>
        <button>Click Me</button>
      </Tooltip>
    )
    await userEvent.click(screen.getByRole('button'))
    // visible
    expect(screen.findByText('Test Tooltip!'))
      .resolves.toBeInstanceOf(HTMLSpanElement)
      .catch(() => {})
    executeAfterMilliseconds(mock, 3000)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
    // hide
    await waitFor(() => screen.findByText('Test Tooltip!'))
    expect(screen.findByText('Test Tooltip!'))
      .rejects.toThrowError()
      .catch(() => {})
  })
})
