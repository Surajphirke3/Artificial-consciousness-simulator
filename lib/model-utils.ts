export function clamp(v: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, v))
}
