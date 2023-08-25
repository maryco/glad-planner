import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react'

import App from '@/App'

test('render App component', () => {
  // it's done automatically?
  // https://testing-library.com/docs/react-testing-library/api/#cleanup
  afterEach(cleanup)

  render(<App />)
  expect(screen.getAllByRole('button').length).toBe(7)
  expect(screen.getAllByLabelText('Open color picker').length).toBe(5)
})