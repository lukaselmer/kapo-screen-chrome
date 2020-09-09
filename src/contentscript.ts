import { convertToSentences } from './sentences'
import { parseInput, displaySentences } from './ui'

function main() {
  const input = parseInput()
  const sentences = convertToSentences(input)
  displaySentences(sentences)
}

main()
