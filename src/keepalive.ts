const state = { last: Date.now() }
const aliveMessagesInterval = 1
const reloadCheckInterval = 1
const reloadAfterSecondsUnseen = 3

export function setupContentscriptAliveMessages(): void {
  try {
    sendAliveMessage()
    setInterval(sendAliveMessage, 1000 * aliveMessagesInterval)
  } catch (error) {
    console.error(error)
  }
}

function sendAliveMessage() {
  chrome.runtime.sendMessage({ alive: true })
}

export function setupBackgroundAliveReceiver(): void {
  chrome.runtime.onMessage.addListener((request: { alive?: true } | undefined, sender) => {
    const url = sender.tab?.url
    if (!url) return
    console.log(`Tab URL: ${url}`)
    if (request?.alive) {
      console.log(`Setting alive from: ${url}`)
      state.last = Date.now()
    }
  })

  setInterval(reloadIfNeeded, 1000 * reloadCheckInterval)
}

function reloadIfNeeded() {
  const seenLastInSeconds = (Date.now() - state.last) / 1000
  if (seenLastInSeconds > reloadAfterSecondsUnseen) console.log('Reload the tab...')
}
