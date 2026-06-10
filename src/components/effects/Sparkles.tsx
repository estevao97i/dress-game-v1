import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Spark {
  id: number
  x: number // % da largura do palco
  y: number // % da altura do palco
  size: number
  delay: number
  emoji: string
}

const EMOJIS = ['✨', '💖', '⭐', '🌟', '💫']

/**
 * Chuva de brilhos sobre a personagem sempre que `pulse` muda
 * (disparado pela store ao equipar um item).
 */
export function Sparkles({ pulse }: { pulse: number }) {
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    if (!pulse) return
    const burst: Spark[] = Array.from({ length: 10 }, (_, i) => ({
      id: pulse + i,
      x: 18 + Math.random() * 64,
      y: 8 + Math.random() * 70,
      size: 14 + Math.random() * 18,
      delay: Math.random() * 0.25,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }))
    setSparks(burst)
    const t = setTimeout(() => setSparks([]), 1100)
    return () => clearTimeout(t)
  }, [pulse])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0.6], rotate: 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: s.delay, ease: 'easeOut' }}
            className="absolute"
            style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}
          >
            {s.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
