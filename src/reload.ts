export const reloadTimeInSeconds = 4.5

export function initReloadTabFallback() {
  setTimeout(() => location.reload(true), 1000 * reloadTimeInSeconds)
}
