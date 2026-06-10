/**
 * Clareia (amt > 0) ou escurece (amt < 0) uma cor hex.
 * Usada para gerar sombras e brilhos automáticos dos assets SVG,
 * permitindo que cada item tenha profundidade em qualquer cor.
 */
export function shade(hex: string, amt: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + amt))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amt))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}
