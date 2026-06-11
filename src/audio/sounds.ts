/**
 * Efeitos sonoros sintetizados com Web Audio API — sem arquivos de áudio.
 * Sons curtinhos, fofos e leves, no estilo dos joguinhos casuais.
 */

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    try {
      ctx = new AudioContext()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Toca uma nota com envelope suave. */
function note(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.12,
) {
  const ac = audio()
  if (!ac) return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t = ac.currentTime + start
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(volume, t + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + duration + 0.05)
}

/** Clique em botões/abas: "pop" curtinho. */
export function playClick() {
  note(660, 0, 0.08, 'triangle', 0.1)
}

/** Passar o dedo/mouse sobre item: tic suave. */
export function playHover() {
  note(880, 0, 0.05, 'sine', 0.04)
}

/** Equipar item: arpejo brilhante (dó-mi-sol agudo). */
export function playEquip() {
  note(784, 0, 0.12, 'triangle', 0.1)
  note(988, 0.07, 0.12, 'triangle', 0.1)
  note(1319, 0.14, 0.2, 'triangle', 0.12)
}

/** Remover item: nota descendo. */
export function playUnequip() {
  note(740, 0, 0.1, 'triangle', 0.09)
  note(523, 0.08, 0.14, 'triangle', 0.08)
}

/** Trocar categoria: dois toques. */
export function playTab() {
  note(587, 0, 0.07, 'sine', 0.08)
  note(784, 0.06, 0.09, 'sine', 0.08)
}

/** Visual aleatório: glissando mágico. */
export function playMagic() {
  const freqs = [523, 659, 784, 988, 1175, 1568]
  freqs.forEach((f, i) => note(f, i * 0.05, 0.16, 'triangle', 0.09))
}
