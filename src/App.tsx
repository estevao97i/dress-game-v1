import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from './store/useGameStore'
import { StartScreen } from './components/screens/StartScreen'
import { GameScreen } from './components/screens/GameScreen'

/** Raiz do jogo: alterna entre a tela inicial e a tela principal. */
export default function App() {
  const screen = useGameStore((s) => s.screen)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {screen === 'start' ? <StartScreen /> : <GameScreen />}
      </motion.div>
    </AnimatePresence>
  )
}
