import { motion } from 'framer-motion'
import { useGameStore } from '../../store/useGameStore'
import { playClick, playMagic } from '../../audio/sounds'
import { exportCharacterPng } from '../../utils/exportPng'

/** Botão redondinho da barra. */
function Btn({
  label,
  emoji,
  onClick,
}: {
  label: string
  emoji: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 text-base shadow-md shadow-candy-200/60 sm:h-10 sm:w-10 sm:text-lg"
    >
      {emoji}
    </motion.button>
  )
}

interface Props {
  onPhoto: () => void
}

/** Barra superior do jogo: voltar, título e ações rápidas. */
export function TopBar({ onPhoto }: Props) {
  const setScreen = useGameStore((s) => s.setScreen)
  const soundOn = useGameStore((s) => s.soundOn)
  const toggleSound = useGameStore((s) => s.toggleSound)
  const randomize = useGameStore((s) => s.randomize)
  const reset = useGameStore((s) => s.reset)

  return (
    <header className="flex items-center gap-2 px-3 py-2">
      <Btn
        label="Voltar para a tela inicial"
        emoji="🏠"
        onClick={() => {
          if (soundOn) playClick()
          setScreen('start')
        }}
      />
      <h1 className="font-display flex-1 truncate text-lg font-extrabold text-fuchsia-600 sm:text-xl">
        Ateliê Encantado{' '}
        <span aria-hidden className="hidden sm:inline">
          ✨
        </span>
      </h1>
      <Btn
        label={soundOn ? 'Desligar sons' : 'Ligar sons'}
        emoji={soundOn ? '🔊' : '🔇'}
        onClick={() => {
          toggleSound()
          playClick()
        }}
      />
      <Btn
        label="Visual surpresa"
        emoji="🎲"
        onClick={() => {
          randomize()
          if (soundOn) playMagic()
        }}
      />
      <Btn
        label="Recomeçar visual"
        emoji="🔄"
        onClick={() => {
          reset()
          if (soundOn) playClick()
        }}
      />
      <Btn
        label="Baixar foto da personagem"
        emoji="📸"
        onClick={() => {
          if (soundOn) playMagic()
          void exportCharacterPng().then(onPhoto)
        }}
      />
    </header>
  )
}
