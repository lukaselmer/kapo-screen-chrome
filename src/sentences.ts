export function convertToSentences(rawSentenceParts: string[]): string[] {
  const sentence = new Sentence()

  sentenceParts(rawSentenceParts).forEach(({ current, next, endSentence, breakWord }) => {
    if (endSentence) {
      sentence.add(current)
      sentence.end()
    } else if (breakWord && next) {
      sentence.add(current.slice(0, current.length - 1))
    } else if (current && next) {
      sentence.add(`${current} `)
    } else if (current) {
      sentence.add(current)
    } else {
      sentence.end()
    }
  })

  return sentence.all()
}

function sentenceParts(rawSentenceParts: string[]): ParagraphPart[] {
  return rawSentenceParts
    .map(current => current.trim())
    .map((current, index) => ({
      current,
      next: rawSentenceParts[index + 1] || '',
      endSentence: current.endsWith('.') || current.endsWith('!'),
      breakWord: current.endsWith('-'),
    }))
}

class Sentence {
  private text = ''
  private sentences: string[] = []

  add(value: string) {
    this.text += value
  }

  all() {
    if (this.text) this.end()
    return this.sentences
  }

  end() {
    if (this.text) {
      this.sentences.push(this.text)
      this.text = ''
    }
  }
}

export interface ParagraphPart {
  current: string
  next: string
  endSentence: boolean
  breakWord: boolean
}
