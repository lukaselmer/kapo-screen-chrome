import { TabStates } from './tab-states'

const tabStates = new TabStates()
const checkIntervalSeconds = 1
const challenge = 'Are you alive?'
const response = "Yes, I'm alive"

export function setupContentscriptChallengeListener(): void {
  chrome.runtime.onMessage.addListener(
    (request, _, sendResponse) => request === challenge && sendResponse(response)
  )
}

export function setupBackgroundAliveChallenger(): void {
  setInterval(() => void challengeTabs(), 1000 * checkIntervalSeconds)
}

async function challengeTabs() {
  const tabs = await relevantTabs()
  tabStates.removeClosedTabChallenges(tabs.map(tab => tab.id))

  tabs.forEach(tab => {
    const id = tab.id as number
    try {
      tabStates.increasePendingChallenge(id)
      if (tabStates.shouldReload(id)) reload(tab)
      else sendAliveChallenge(id)
    } catch (error) {
      tabStates.increasePendingChallenge(id)
      console.error(error)
    }
  })
}

function sendAliveChallenge(id: number) {
  chrome.tabs.sendMessage(id, challenge, response => {
    if (response === response) tabStates.resetPendingChallenges(id)
  })
}

async function relevantTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise(resolve =>
    chrome.tabs.query({ windowType: 'normal', url: '*://*/GMSC/Workflows/Form*' }, tabs =>
      resolve(tabs.filter(tab => tab.id))
    )
  )
}

function reload(tab: chrome.tabs.Tab) {
  const id = tab.id as number
  if (tabStates.shouldCloneTab(id)) {
    cloneTab(tab)
    tabStates.markTabAsCloned(id)
    tabStates.resetPendingChallenges(id)
  }
  removeTab(id)
}

function cloneTab(tab: chrome.tabs.Tab) {
  chrome.tabs.create({
    windowId: tab.windowId,
    openerTabId: tab.id,
    url: tab.url,
    index: tab.index,
    active: tab.active,
    selected: tab.selected,
  })
}

function removeTab(id: number) {
  chrome.tabs.remove(id)
}
