function main() {
  const input = parseInput()
  const paragraphs = calculateParagraphs(input)
  displayParagraphs(paragraphs)
}

function parseInput(): InputParagraph[] {
  return [...document.querySelectorAll('input')]
    .filter(el => el.id?.toLowerCase()?.includes('text'))
    .map(el => (el.value ? { filled: true, value: el.value } : { filled: false, value: '' }))
}

export function calculateParagraphs(inputValues: InputParagraph[]): string[] {
  return inputValues.map(value => value.value)
}

function displayParagraphs(paragraphs: string[]) {
  console.log(paragraphs)
}

interface InputParagraph {
  filled: boolean
  value: string
}

console.log('extension loaded')
console.log('extension loaded')
main()
