import { convertToSentences } from './sentences'

test('concatinate paragraphs with dash', () => {
  expect(convertToSentences(['Die Auto-', 'tür war offen'])).toEqual(['Die Autotür war offen'])
})

test('removes the last paragraph', () => {
  expect(convertToSentences(['Die Auto-', 'tür war offen', ''])).toEqual(['Die Autotür war offen'])
})

test('prints the dash if the next paragraph is empty', () => {
  expect(convertToSentences(['Die Auto-', '', 'tür war offen'])).toEqual(['Die Auto-', 'tür war offen'])
})

test('separates paragraphs if sentence ending', () => {
  expect(convertToSentences(['Die Autotür war offen.', 'Die andere auch.'])).toEqual([
    'Die Autotür war offen.',
    'Die andere auch.',
  ])
  expect(convertToSentences(['Die Autotür war offen!', 'Die andere auch.'])).toEqual([
    'Die Autotür war offen!',
    'Die andere auch.',
  ])
})

test('joins lines with space', () => {
  expect(convertToSentences(['Die Autotür', 'war offen'])).toEqual(['Die Autotür war offen'])
})

test('prints the line if last line ends with a dash', () => {
  expect(convertToSentences(['Die Auto-'])).toEqual(['Die Auto-'])
})

test('avoids consecutive spaces', () => {
  expect(convertToSentences(['Die Autotür ', 'war offen'])).toEqual(['Die Autotür war offen'])
})

test('integration test: complex case', () => {
  expect(
    convertToSentences([
      'Die Auto-',
      'tür war offen.',
      'Der nächste Fall',
      '',
      'Nochmal!',
      'Weiter gehts ',
      'jetzt',
      '',
      'Und noch weiter.',
      'Gut',
    ])
  ).toEqual([
    'Die Autotür war offen.',
    'Der nächste Fall',
    'Nochmal!',
    'Weiter gehts jetzt',
    'Und noch weiter.',
    'Gut',
  ])
})
