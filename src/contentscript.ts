import { parseInput, calculateParagraphs, displayParagraphs } from './paragraphs'

function main() {
  const input = parseInput()
  const paragraphs = calculateParagraphs(input)
  displayParagraphs(paragraphs)
}

main()
