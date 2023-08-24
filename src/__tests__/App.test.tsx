import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '@/App'

test('render App component', async () => {
  render(<App />)
  await screen.findAllByRole('button')
  expect(screen.getAllByRole('button').length).toBe(7)
  expect(screen.getAllByLabelText('Open color picker').length).toBe(5)
})