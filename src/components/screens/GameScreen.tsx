import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '../../store/useGameStore'
import { Character } from '../character/Character'
import { Sparkles } from '../effects/Sparkles'
import { TopBar } from '../game/TopBar'
import { WardrobePanel } from '../game/WardrobePanel'

/**
 * Tela principal: personagem no palco + guarda-roupa.
 * Celular/tablet: palco em cima, painel compacto embaixo.
 * Desktop: palco à esquerda, painel largo à direita.
 */
export function GameScreen() {
  const look = useGameStore((s) => s.look)
  const equipPulse = useGameStore((s) => s.equipPulse)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="flex h-dvh flex-col">
      <TopBar onPhoto={() => showToast('📸 Foto salva! Confira seus downloads 💖')} />

      <main className="flex min-h-0 flex-1 flex-col gap-2 px-2 pb-2 lg:flex-row lg:gap-4 lg:px-4 lg:pb-4">
        {/* palco da personagem (zona de soltar itens arrastados) */}
        <section
          id="stage-drop"
          aria-label="Personagem"
          className="relative min-h-0 flex-1 lg:flex-[1.1]"
        >
          <div className="absolute inset-0 rounded-3xl bg-white/40 shadow-inner" />
          {/* bolinhas decorativas de fundo */}
          <div aria-hidden className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-candy-200/50" />
            <div className="absolute right-4 bottom-10 h-24 w-24 rounded-full bg-lilac-200/50" />
            <div className="absolute top-10 right-10 h-12 w-12 rounded-full bg-baby-200/60" />
          </div>
          <motion.div
            key={equipPulse || 'static'}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative mx-auto h-full max-w-full py-1"
            style={{ aspectRatio: '420 / 680' }}
          >
            <Character look={look} />
          </motion.div>
          <Sparkles pulse={equipPulse} />
        </section>

        {/* guarda-roupa */}
        <section
          aria-label="Guarda-roupa"
          className="flex h-[42dvh] min-h-0 shrink-0 flex-col rounded-3xl bg-white/60 p-2 shadow-lg shadow-candy-200/40 backdrop-blur lg:h-auto lg:w-[460px] lg:shrink lg:p-3"
        >
          <WardrobePanel />
        </section>
      </main>

      {/* aviso fofo (toast) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-xl"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
