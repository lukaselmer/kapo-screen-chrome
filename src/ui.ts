export function parseInput(): string[] {
  return [...document.querySelectorAll('input')]
    .filter(el => el.id?.toLowerCase()?.includes('text'))
    .map(el => el.value)
}

export function displaySentences(paragraphs: string[]): void {
  console.log(paragraphs)
}
