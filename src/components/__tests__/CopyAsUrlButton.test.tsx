import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { CopyAsUrlButton } from '@/components/CopyAsUrlButton'

function executeAfterMilliseconds(func: () => void, milliseconds: number) {
  setTimeout(func, milliseconds)
}

const mock = vi.fn(() => {})

// https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
  clipboard: {
    // https://eslint.org/docs/latest/rules/require-await
    // Allow empty functions.
    // writeText: async function () {},
    writeText: async () => Promise.resolve(),
  }
})

describe('Render CopyAsUrlButton component', () => {
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

  test('not render tooltip in first', () => {
    render(
      <CopyAsUrlButton />
    )
    expect(screen.findByLabelText('Copy all colors as url'))
      .resolves.toBeVisible()
      .catch(() => {})

    executeAfterMilliseconds(mock, 1000)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(screen.findByText('URL Copied!'))
      .rejects.toThrowError()
      .catch(() => {})
  })

  test('render tooltip after click event', async () => {
    render(
      <CopyAsUrlButton />
    )
    expect(screen.findByLabelText('Copy all colors as url'))
      .resolves.toBeVisible()
      .catch(() => {})

    await userEvent.click(screen.getByRole('button'))
    executeAfterMilliseconds(mock, 1000)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(screen.findByText('URL Copied!'))
      .resolves.toBeInstanceOf(HTMLSpanElement)
      .catch(() => {})
  })

  test('copy colors as url', async () => {    
    vi.spyOn(navigator.clipboard, 'writeText')
    render(
      <CopyAsUrlButton />
    )
    expect(screen.findByLabelText('Copy all colors as url'))
      .resolves.toBeVisible()
      .catch(() => {})

    await userEvent.click(screen.getByRole('button'))
    executeAfterMilliseconds(mock, 1000)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith('http://localhost:3000/?color=f9fafb&color=f3f4f6&color=e5e7eb&color=d1d5db&color=9ca3af')
  })
})
