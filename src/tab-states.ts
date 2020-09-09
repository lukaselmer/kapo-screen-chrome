const allowedPendingChallenges = 5

export class TabStates {
  private pendingChallengesPerTab = new Map<number, number>()
  private clonedTabs = new Set<number>()

  resetPendingChallenges(tabId: number): void {
    this.pendingChallengesPerTab.set(tabId, 0)
  }

  shouldReload(tabId: number): boolean {
    const pendingChallenges = this.pendingChallengesPerTab.get(tabId)
    return (pendingChallenges || Number.POSITIVE_INFINITY) > allowedPendingChallenges
  }

  removeClosedTabChallenges(tabIds: (number | undefined)[]): void {
    const closedTabIds = [...this.pendingChallengesPerTab.keys()].filter(
      tabId => !tabIds.includes(tabId)
    )
    closedTabIds.forEach(key => this.pendingChallengesPerTab.delete(key))
  }

  increasePendingChallenge(tabId: number): void {
    const newValue = (this.pendingChallengesPerTab.get(tabId) || 0) + 1
    this.pendingChallengesPerTab.set(tabId, newValue)
  }

  shouldCloneTab(tabId: number): boolean {
    return !this.clonedTabs.has(tabId)
  }

  markTabAsCloned(tabId: number): void {
    this.clonedTabs.add(tabId)
  }
}
