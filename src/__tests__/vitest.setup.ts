import { vi } from 'vitest'

// エラーにならなければ十分なのでスタブ化でOK
// global.ResizeObserver = vi.fn().mockImplementation(() => ({
//   observe: vi.fn(),
//   unobserve: vi.fn(),
//   disconnect: vi.fn(),
// }))
// https://vitest.dev/guide/mocking.html#globals
const ResizeObserverMock = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
vi.stubGlobal('ResizeObserver', ResizeObserverMock)