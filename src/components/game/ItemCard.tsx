import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import type { Item } from '../../types'
import { REMOVABLE_SLOTS } from '../../data'
import { useGameStore } from '../../store/useGameStore'
import { playEquip, playHover, playUnequip } from '../../audio/sounds'

interface Props {
  item: Item
  /**
   * Direção de scroll permitida pelo toque (a outra inicia o arrasto):
   * 'pan-x' na fileira horizontal do celular, 'pan-y' na grade do desktop.
   */
  touchAction: 'pan-x' | 'pan-y'
}

const DRAG_THRESHOLD = 12

/**
 * Cartão de item: toque equipa/remove, arrastar sobre a personagem equipa.
 * Um "fantasma" do item segue o dedo/mouse durante o arrasto.
 */
export function ItemCard({ item, touchAction }: Props) {
  const look = useGameStore((s) => s.look)
  const equip = useGameStore((s) => s.equip)
  const unequip = useGameStore((s) => s.unequip)
  const soundOn = useGameStore((s) => s.soundOn)

  const equipped = look[item.slot]
  const selected = equipped?.itemId === item.id
  const color = selected ? equipped!.color : item.colors?.[0] ?? '#F48FB1'

  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const dragging = useRef(false)

  const doEquip = () => {
    if (selected && REMOVABLE_SLOTS.includes(item.slot)) {
      unequip(item.slot)
      if (soundOn) playUnequip()
    } else {
      equip(item, selected ? equipped!.color : undefined)
      if (soundOn) playEquip()
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
    dragging.current = false
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    // só vira arrasto no eixo que não é o de scroll
    const crossAxis = touchAction === 'pan-x' ? Math.abs(dy) : Math.abs(dx)
    if (!dragging.current && crossAxis > DRAG_THRESHOLD) dragging.current = true
    if (dragging.current) setGhost({ x: e.clientX, y: e.clientY })
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragging.current) {
      // soltou sobre a personagem? então equipa!
      const stage = document.getElementById('stage-drop')?.getBoundingClientRect()
      if (
        stage &&
        e.clientX >= stage.left &&
        e.clientX <= stage.right &&
        e.clientY >= stage.top &&
        e.clientY <= stage.bottom
      ) {
        equip(item)
        if (soundOn) playEquip()
      }
    } else if (start.current) {
      doEquip()
    }
    start.current = null
    dragging.current = false
    setGhost(null)
  }

  const thumb = (
    <svg viewBox={(item.thumbBox ?? [0, 0, 420, 680]).join(' ')} className="h-full w-full">
      {item.slot === 'skin' ? (
        <circle cx="210" cy="340" r="200" fill={color} stroke="#fff" strokeWidth="16" />
      ) : (
        <>
          {item.renderBack?.({ color, skin: '#FFD9BC' })}
          {item.render({ color, skin: '#FFD9BC' })}
        </>
      )}
    </svg>
  )

  return (
    <>
      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onMouseEnter={() => soundOn && window.matchMedia('(hover: hover)').matches && playHover()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          start.current = null
          dragging.current = false
          setGhost(null)
        }}
        style={{ touchAction }}
        aria-pressed={selected}
        aria-label={item.name}
        className={`relative flex h-24 w-20 shrink-0 cursor-grab flex-col items-center justify-between rounded-2xl border-2 p-1.5 pb-1 shadow-sm transition-colors sm:h-28 sm:w-24 lg:w-auto ${
          selected
            ? 'border-candy-400 bg-candy-100 shadow-candy-200 shadow-md'
            : 'border-white bg-white/80 hover:border-candy-200'
        }`}
      >
        <div className="pointer-events-none h-full w-full">{thumb}</div>
        <span className="pointer-events-none w-full truncate text-center text-[10px] font-bold text-fuchsia-900/70 sm:text-[11px]">
          {item.name}
        </span>
        {selected && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-candy-400 text-[10px] text-white shadow">
            ✓
          </span>
        )}
      </motion.button>

      {/* fantasma que segue o ponteiro durante o arrasto */}
      {ghost &&
        createPortal(
          <div
            className="drag-ghost h-24 w-20"
            style={{ left: ghost.x - 40, top: ghost.y - 60 }}
          >
            {thumb}
          </div>,
          document.body,
        )}
    </>
  )
}
