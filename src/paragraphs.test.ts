import { calculateParagraphs } from './paragraphs'

test('concatinate paragraphs with dash', () => {
  expect(
    calculateParagraphs([
      { filled: true, value: 'Die Auto-' },
      { filled: true, value: 'tür war offen' },
    ])
  ).toEqual(['Die Autotür war offen'])
})

test('removes the last paragraph', () => {
  expect(
    calculateParagraphs([
      { filled: true, value: 'Die Auto-' },
      { filled: true, value: 'tür war offen' },
      { filled: false, value: '' },
    ])
  ).toEqual(['Die Autotür war offen'])
})

test('prints the dash if the next paragraph is empty', () => {
  expect(
    calculateParagraphs([
      { filled: true, value: 'Die Auto-' },
      { filled: false, value: '' },
      { filled: true, value: 'tür war offen' },
    ])
  ).toEqual(['Die Auto-', 'tür war offen'])
})

test('prints the line if last line ends with a dash', () => {
  expect(calculateParagraphs([{ filled: true, value: 'Die Auto-' }])).toEqual(['Die Auto-'])
})
