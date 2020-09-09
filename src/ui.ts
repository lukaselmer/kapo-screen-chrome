import { reloadTimeInSeconds } from './reload'

const progressTimerState = { started: false, startedAt: new Date() }

export function isKapoScreen() {
  return (
    document.querySelector('#ig-menugroup-Grossbildanzeige') &&
    (document.querySelector('#GBA_1FormGroup') || document.querySelector('#GBA_2FormGroup'))
  )
}

export function showRoot() {
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
  startProgressTimer()
}

function findOrCreateContainer() {
  const containerId = 'kaposcreen_container'
  const container = document.querySelector(`#${containerId}`)
  if (container instanceof HTMLDivElement) {
    while (container.hasChildNodes()) container.removeChild(container.lastChild!)
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
  child.appendChild(createFooterProgress())
  container.appendChild(child)
}

function createFooterText() {
  const content = `Notizen ${notesId()}, ${new Date().toLocaleString()}`
  const footerNote = document.createElement('div')
  footerNote.className = 'kaposcreen__footer-text'
  footerNote.innerText = content
  return footerNote
}

function createFooterProgress() {
  const footerProgress = document.createElement('progress')
  footerProgress.className = 'kaposcreen__footer-progress'
  footerProgress.innerText = '70%'
  footerProgress.value = 0
  footerProgress.max = reloadTimeInSeconds * 1000
  return footerProgress
}

function notesId() {
  const notesElement = document.querySelector('input#id')
  return notesElement instanceof HTMLInputElement ? notesElement.value : ''
}

function startProgressTimer() {
  if (progressTimerState.started) return
  progressTimerState.started = true
  progressTimerState.startedAt = new Date()
  setInterval(() => {
    const progress = document.querySelector('progress.kaposcreen__footer-progress')
    if (progress instanceof HTMLProgressElement) {
      progress.value = new Date().getTime() - progressTimerState.startedAt.getTime() + 40
    }
  }, 1000 / 60 /* ~60 FPS */)
}
