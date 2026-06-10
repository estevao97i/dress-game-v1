import { motion } from 'framer-motion'
import { useGameStore } from '../../store/useGameStore'
import { playMagic } from '../../audio/sounds'
import { Character } from '../character/Character'

const FLOATIES = [
  { emoji: '🎀', x: '8%', y: '12%', size: 'text-4xl', delay: '0s' },
  { emoji: '✨', x: '85%', y: '8%', size: 'text-3xl', delay: '0.6s' },
  { emoji: '💖', x: '78%', y: '70%', size: 'text-4xl', delay: '1.2s' },
  { emoji: '⭐', x: '12%', y: '74%', size: 'text-3xl', delay: '1.8s' },
  { emoji: '👗', x: '90%', y: '40%', size: 'text-3xl', delay: '0.9s' },
  { emoji: '💄', x: '4%', y: '44%', size: 'text-2xl', delay: '1.5s' },
]

/** Tela inicial com título, decorações flutuantes e botão de jogar. */
export function StartScreen() {
  const setScreen = useGameStore((s) => s.setScreen)
  const soundOn = useGameStore((s) => s.soundOn)
  const look = useGameStore((s) => s.look)

  return (
    <div className="relative flex h-dvh flex-col items-center justify-center gap-4 overflow-hidden px-6">
      {/* decorações flutuantes */}
      {FLOATIES.map((f) => (
        <span
          key={f.emoji}
          aria-hidden
          className={`anim-floaty absolute ${f.size}`}
          style={{ left: f.x, top: f.y, animationDelay: f.delay }}
        >
          {f.emoji}
        </span>
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="font-display text-center text-5xl font-extrabold text-fuchsia-500 drop-shadow-[0_3px_0_#fbcfe8] sm:text-6xl"
      >
        Ateliê
        <br />
        Encantado
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm font-semibold text-purple-500/80 sm:text-base"
      >
        Monte looks incríveis, penteados e maquiagens! 💅
      </motion.p>

      {/* prévia da personagem salva */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
        className="h-[38dvh] max-h-80"
        style={{ aspectRatio: '420 / 680' }}
      >
        <Character look={look} svgId="start-preview" />
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, type: 'spring', bounce: 0.5 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          if (soundOn) playMagic()
          setScreen('game')
        }}
        className="font-display rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 px-12 py-4 text-2xl font-extrabold text-white shadow-xl shadow-candy-300/60"
      >
        Jogar ✨
      </motion.button>

      <p className="absolute bottom-3 text-[11px] font-semibold text-purple-400/60">
        Seu visual fica salvo automaticamente 💾
      </p>
    </div>
  )
}
