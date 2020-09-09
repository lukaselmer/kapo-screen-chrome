export function parseInput(): InputParagraph[] {
  return [...document.querySelectorAll('input')]
    .filter(el => el.id?.toLowerCase()?.includes('text'))
    .map(el => (el.value ? { filled: true, value: el.value } : { filled: false, value: '' }))
}

export function calculateParagraphs(inputValues: InputParagraph[]): string[] {
  const state = new ParagraphState()

  for (const { value, filled } of inputValues) {
    if (value.endsWith('-')) {
      state.addToCurrentParagraph(value)
    } else if (filled) {
      state.addToCurrentParagraph(value)
      state.nextParagraph()
    } else {
      state.nextParagraph()
    }
  }

  return state.allParagraphs()
}

export function displayParagraphs(paragraphs: string[]) {
  console.log(paragraphs)
}

class ParagraphState {
  private text = ''
  private paragraphs: string[] = []

  allParagraphs() {
    if (this.text) this.nextParagraph()
    return this.paragraphs
  }

  nextParagraph() {
    if (this.text) {
      this.paragraphs.push(this.text)
      this.text = ''
    }
  }

  addToCurrentParagraph(value: string) {
    this.text = this.textWithoutEndingDash + value
  }

  private get textWithoutEndingDash() {
    return this.text.endsWith('-') ? this.text.slice(0, this.text.length - 1) : this.text
  }
}

export interface InputParagraph {
  filled: boolean
  value: string
}
