import { convertToSentences } from './sentences'
import { parseInput, displaySentences, showRoot, isKapoScreen } from './ui'
import { initReloadTabFallback } from './reload'

function main() {
  try {
    initReloadTabFallback()
    if (isKapoScreen()) {
      const input = parseInput()
      const sentences = convertToSentences(input)
      displaySentences(sentences)
    } else {
      showRoot()
    }
  } catch (error) {
    console.error(error)
  }
}

main()
