import type { ReactNode } from 'react'
import type { CharacterLook, Slot } from '../../types'
import { getItem } from '../../data'
import { SKIN_TONES } from '../../data/palette'
import { Body } from './Body'

/**
 * Ordem de desenho das camadas (de trás para frente).
 * O cabelo tem duas camadas: a de trás (renderBack) fica atrás
 * do corpo e a da frente (franja/coroa) fica sobre o rosto.
 */
const LAYERS_OVER_BODY: Slot[] = [
  'shoes',
  'bottom',
  'top',
  'dress',
  'necklace',
  'bracelet',
  'eyeshadow',
  'eyes',
  'eyeliner',
  'brows',
  'nose',
  'blush',
  'mouth',
  'lipstick',
  'earrings',
]

interface Props {
  look: CharacterLook
  /** id do elemento <svg> (usado na exportação PNG). */
  svgId?: string
}

/** A personagem completa, desenhada em SVG no viewBox 0 0 420 680. */
export function Character({ look, svgId = 'character-stage' }: Props) {
  const skinColor =
    SKIN_TONES.find((t) => t.id === look.skin?.itemId)?.color ?? SKIN_TONES[1].color

  const layer = (slot: Slot, back = false): ReactNode => {
    const equipped = look[slot]
    if (!equipped) return null
    const item = getItem(equipped.itemId)
    if (!item) return null
    const ctx = { color: equipped.color, skin: skinColor }
    return back ? item.renderBack?.(ctx) : item.render(ctx)
  }

  return (
    <svg
      id={svgId}
      viewBox="0 0 420 680"
      className="h-full w-full"
      role="img"
      aria-label="Personagem customizada"
    >
      {/* cabelo: camada de trás (balança suavemente) */}
      <g className="anim-hair">{layer('hair', true)}</g>

      <Body skin={skinColor} />

      {LAYERS_OVER_BODY.map((slot) => (
        <g key={slot}>{layer(slot)}</g>
      ))}

      {/* cabelo: franja/coroa + acessórios de cabeça e óculos por cima */}
      <g className="anim-hair">{layer('hair')}</g>
      <g>{layer('headwear')}</g>
      <g>{layer('glasses')}</g>
    </svg>
  )
}
