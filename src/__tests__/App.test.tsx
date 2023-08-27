import '@testing-library/jest-dom'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Konva from 'konva'

import App from '@/App'


afterEach(cleanup)

test('render App component', async () => {
  render(<App />)
  await waitFor(() => screen.getByRole('presentation'))

  // Preview container
  const imageContainer = screen.getByLabelText('Concat all patterns image')
  expect(imageContainer).toBeInstanceOf(HTMLDivElement)
  expect(imageContainer.children.length).toBe(9)

  // 9 Grid patterns
  const stage = Konva.stages[0].find('Layer')[0]
  expect(stage?.getLayer()?.children?.length).toBe(9)

  // Buttons
  expect(screen.getAllByRole('button').length).toBe(7)
  expect(screen.getAllByLabelText('Open color picker').length).toBe(5)
})

test('switch preview container orientation', async () => {
  render(<App />)
  await waitFor(() => screen.getByRole('presentation'))

  const imageContainer = screen.getByLabelText('Concat all patterns image')

  // Act & assertion
  await userEvent.click(screen.getByLabelText('Switch orientation'))
  expect(imageContainer.classList.contains('flex-row')).toBeTruthy()
  expect(imageContainer.classList.contains('flex-col')).toBeFalsy()

  await userEvent.click(screen.getByLabelText('Switch orientation'))
  expect(imageContainer.classList.contains('flex-row')).toBeFalsy()
  expect(imageContainer.classList.contains('flex-col')).toBeTruthy()
})
