import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CharacterLook, Item, Slot } from '../types'
import { DEFAULT_LOOK, randomLook } from '../data'

interface GameState {
  /** Tela atual do jogo. */
  screen: 'start' | 'game'
  /** Visual equipado da personagem (salvo automaticamente). */
  look: CharacterLook
  /** Sons ligados? */
  soundOn: boolean
  /** Carimbo do último equip — dispara o efeito de brilho. */
  equipPulse: number

  setScreen: (screen: 'start' | 'game') => void
  toggleSound: () => void
  /** Equipa um item (resolvendo conflitos vestido × conjunto). */
  equip: (item: Item, color?: string) => void
  /** Remove o item de um slot. */
  unequip: (slot: Slot) => void
  /** Troca só a cor do item já equipado num slot. */
  setColor: (slot: Slot, color: string) => void
  /** Visual aleatório ("Surpresa!"). */
  randomize: () => void
  /** Volta ao visual inicial. */
  reset: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      screen: 'start',
      look: DEFAULT_LOOK,
      soundOn: true,
      equipPulse: 0,

      setScreen: (screen) => set({ screen }),
      toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),

      equip: (item, color) =>
        set((s) => {
          const look: CharacterLook = { ...s.look }
          // vestido remove blusa + saia/calça, e vice-versa
          if (item.slot === 'dress') {
            delete look.top
            delete look.bottom
          }
          if (item.slot === 'top' || item.slot === 'bottom') {
            delete look.dress
          }
          look[item.slot] = {
            itemId: item.id,
            color: color ?? item.colors?.[0] ?? '#000000',
          }
          return { look, equipPulse: Date.now() }
        }),

      unequip: (slot) =>
        set((s) => {
          const look = { ...s.look }
          delete look[slot]
          return { look }
        }),

      setColor: (slot, color) =>
        set((s) => {
          const current = s.look[slot]
          if (!current) return s
          return { look: { ...s.look, [slot]: { ...current, color } }, equipPulse: Date.now() }
        }),

      randomize: () => set({ look: randomLook(), equipPulse: Date.now() }),
      reset: () => set({ look: DEFAULT_LOOK }),
    }),
    {
      name: 'dress-game-v1', // chave no localStorage
      partialize: (s) => ({ look: s.look, soundOn: s.soundOn }),
    },
  ),
)
