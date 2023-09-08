export function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0
  const seconds = Math.round(time - 60 * minutes) || 0

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
