import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Category } from '../../types'
import { CATEGORIES, itemsOf, subsOf } from '../../data'
import { useGameStore } from '../../store/useGameStore'
import { playClick, playTab } from '../../audio/sounds'
import { useIsDesktop } from '../../utils/useIsDesktop'
import { ItemCard } from './ItemCard'

/**
 * Guarda-roupa responsivo:
 *  - celular/tablet: chips horizontais (categorias + subcategorias) e
 *    fileira de itens com scroll horizontal — vários "setores" compactos
 *    empilhados para caber nas dimensões da tela.
 *  - desktop: trilho de categorias à esquerda + grade com scroll vertical.
 */
export function WardrobePanel() {
  const isDesktop = useIsDesktop()
  const [category, setCategory] = useState<Category>('roupas')
  const [subByCat, setSubByCat] = useState<Partial<Record<Category, string>>>({})
  const look = useGameStore((s) => s.look)
  const setColor = useGameStore((s) => s.setColor)
  const soundOn = useGameStore((s) => s.soundOn)

  const subs = useMemo(() => subsOf(category), [category])
  const sub = subByCat[category] ?? subs[0]
  const items = useMemo(() => itemsOf(category, sub), [category, sub])

  // item equipado da subcategoria ativa → mostra as cores dele
  const equippedItem = useMemo(() => {
    for (const it of items) {
      if (look[it.slot]?.itemId === it.id) return it
    }
    return null
  }, [items, look])
  const equippedColors =
    equippedItem && equippedItem.colors && equippedItem.colors.length > 1
      ? equippedItem.colors
      : null

  const categoryNav = (
    <nav
      aria-label="Categorias"
      className={
        isDesktop
          ? 'v-scroll flex w-20 shrink-0 flex-col gap-1.5'
          : 'h-scroll flex shrink-0 gap-1.5 px-1'
      }
    >
      {CATEGORIES.map((cat) => (
        <motion.button
          key={cat.id}
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setCategory(cat.id)
            if (soundOn) playTab()
          }}
          aria-pressed={category === cat.id}
          className={`flex shrink-0 items-center font-bold transition-colors ${
            isDesktop
              ? 'w-full flex-col gap-0.5 rounded-2xl px-2 py-2 text-[10px]'
              : 'gap-1.5 rounded-full px-3 py-1.5 text-xs'
          } ${
            category === cat.id
              ? 'bg-candy-400 text-white shadow-md shadow-candy-200'
              : 'bg-white/80 text-fuchsia-900/70 hover:bg-candy-100'
          }`}
        >
          <span className={isDesktop ? 'text-2xl' : 'text-base'}>{cat.icon}</span>
          <span>{cat.name}</span>
        </motion.button>
      ))}
    </nav>
  )

  return (
    <div className={`flex h-full min-h-0 gap-2 ${isDesktop ? 'flex-row gap-3' : 'flex-col'}`}>
      {categoryNav}

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {/* subcategorias */}
        {subs.length > 1 && (
          <div aria-label="Subcategorias" className="h-scroll flex shrink-0 gap-1.5 px-1">
            {subs.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSubByCat((prev) => ({ ...prev, [category]: s }))
                  if (soundOn) playClick()
                }}
                aria-pressed={s === sub}
                className={`shrink-0 rounded-full border-2 px-3 py-1 text-[11px] font-bold transition-colors ${
                  s === sub
                    ? 'border-lilac-400 bg-lilac-200 text-purple-800'
                    : 'border-transparent bg-white/70 text-fuchsia-900/60 hover:bg-lilac-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* cores do item equipado nesta subcategoria */}
        {equippedColors && (
          <div aria-label="Cores" className="h-scroll flex shrink-0 items-center gap-2 px-2 py-1">
            <span className="text-[10px] font-bold text-fuchsia-900/50">Cor:</span>
            {equippedColors.map((c) => {
              const active = look[equippedItem!.slot]?.color === c
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setColor(equippedItem!.slot, c)
                    if (soundOn) playClick()
                  }}
                  aria-label={`Cor ${c}`}
                  aria-pressed={active}
                  className={`h-6 w-6 shrink-0 rounded-full border-2 shadow-sm transition-transform ${
                    active ? 'scale-125 border-fuchsia-500' : 'border-white hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              )
            })}
          </div>
        )}

        {/* itens: grade vertical no desktop, fileira horizontal no celular */}
        <div
          className={
            isDesktop
              ? 'v-scroll grid min-h-0 flex-1 grid-cols-3 content-start gap-3 pr-1 xl:grid-cols-4'
              : 'h-scroll flex min-h-0 flex-1 items-start gap-2 px-1 pb-1'
          }
        >
          {items.map((item) => (
            <ItemCard key={item.id} item={item} touchAction={isDesktop ? 'pan-y' : 'pan-x'} />
          ))}
        </div>
      </div>
    </div>
  )
}
