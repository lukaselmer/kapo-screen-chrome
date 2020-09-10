export function isKapoScreen(): boolean {
  return !!(
    document.querySelector('#ig-menugroup-Grossbildanzeige') &&
    (document.querySelector('#GBA_1FormGroup') || document.querySelector('#GBA_2FormGroup'))
  )
}

export function showRoot(): void {
  const root = document.querySelector('#ig-root')
  if (root instanceof HTMLElement) root.style.display = 'block'
}

export function parseInput(): string[] {
  return [...document.querySelectorAll('input')]
    .filter(el => el.id?.toLowerCase()?.includes('text'))
    .map(el => el.value)
}

export function displaySentences(sentences: string[]): void {
  const outerContainer = findOrCreateContainer()
  addSentences(sentences, outerContainer)
  addFooter(outerContainer)
}

function findOrCreateContainer() {
  const containerId = 'kaposcreen_container'
  const container = document.querySelector(`#${containerId}`)
  if (container instanceof HTMLDivElement) {
    while (container.lastChild) container.removeChild(container.lastChild)
    return container
  }

  const newContainer = document.createElement('div')
  newContainer.id = containerId
  document.body.prepend(newContainer)
  return newContainer
}

function addSentences(sentences: string[], outerContainer: HTMLDivElement) {
  const child = document.createElement('div')
  child.className = 'kaposcreen__sentences'
  sentences.forEach(sentence => addSentence(child, sentence))
  outerContainer.appendChild(child)
}

function addSentence(container: HTMLDivElement, sentence: string) {
  const child = document.createElement('div')
  child.className = 'kaposcreen__sentence'
  child.innerText = sentence
  container.appendChild(child)
}

function addFooter(container: HTMLDivElement) {
  const child = document.createElement('footer')
  child.className = 'kaposcreen__footer'
  child.appendChild(createFooterText())
  container.appendChild(child)
}

function createFooterText() {
  const content = `Notizen ${notesId()}, ${new Date().toLocaleString()}`
  const footerNote = document.createElement('div')
  footerNote.className = 'kaposcreen__footer-text'
  footerNote.innerText = content
  return footerNote
}

function notesId() {
  const notesElement = document.querySelector('input#id')
  return notesElement instanceof HTMLInputElement ? notesElement.value : ''
}
