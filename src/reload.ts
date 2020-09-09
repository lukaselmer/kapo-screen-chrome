export const reloadTimeInSeconds = 4.5

export function initReloadTabFallback(): void {
  setTimeout(() => location.reload(true), 1000 * reloadTimeInSeconds)
}
