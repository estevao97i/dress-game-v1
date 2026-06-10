import type { Item } from '../types'
import { shade } from '../utils/color'

/*
 * Sapatos — tornozelos em y≈592, pés entre y 592 e 618.
 * Pé esquerdo: centro x≈186 · pé direito: centro x≈234.
 */

type ShoeDraw = (c: string) => React.ReactNode

/** Tênis: corpo arredondado + sola branca + cadarço. */
const sneaker: ShoeDraw = (c) => {
  const dk = shade(c, -30)
  const foot = (cx: number, dir: number) => (
    <g>
      <path d={`M ${cx - 14 * dir} 584 L ${cx + 12 * dir} 584 C ${cx + 20 * dir} 588 ${cx + 22 * dir} 598 ${cx + 20 * dir} 606 L ${cx - 16 * dir} 606 Z`} fill={c} />
      <path d={`M ${cx - 17 * dir} 604 L ${cx + 21 * dir} 604 L ${cx + 21 * dir} 612 C ${cx} 616 ${cx - 17 * dir} 614 ${cx - 17 * dir} 612 Z`} fill="#FFFFFF" />
      <path d={`M ${cx - 8 * dir} 588 L ${cx + 4 * dir} 592 M ${cx - 8 * dir} 594 L ${cx + 4 * dir} 598`} stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <path d={`M ${cx - 14 * dir} 584 L ${cx - 14 * dir} 604`} stroke={dk} strokeWidth="2" opacity="0.5" />
    </g>
  )
  return (
    <g>
      {foot(186, -1)}
      {foot(234, 1)}
    </g>
  )
}

/** Salto alto: bico fino + salto. */
const heels: ShoeDraw = (c) => {
  const dk = shade(c, -35)
  const foot = (cx: number, dir: number) => (
    <g>
      <path d={`M ${cx - 12 * dir} 586 L ${cx + 10 * dir} 588 C ${cx + 22 * dir} 594 ${cx + 26 * dir} 604 ${cx + 24 * dir} 610 L ${cx - 6 * dir} 610 L ${cx - 12 * dir} 598 Z`} fill={c} />
      <path d={`M ${cx - 8 * dir} 608 L ${cx - 4 * dir} 608 L ${cx - 6 * dir} 622 L ${cx - 10 * dir} 622 Z`} fill={dk} />
      <circle cx={cx + 16 * dir} cy={596} r="2.6" fill="#FFFFFF" opacity="0.8" />
    </g>
  )
  return (
    <g>
      {foot(186, -1)}
      {foot(234, 1)}
    </g>
  )
}

/** Sapatilha: baixinha com lacinho. */
const flats: ShoeDraw = (c) => {
  const dk = shade(c, -30)
  const foot = (cx: number, dir: number) => (
    <g>
      <path d={`M ${cx - 13 * dir} 592 L ${cx + 10 * dir} 592 C ${cx + 20 * dir} 596 ${cx + 22 * dir} 606 ${cx + 19 * dir} 612 L ${cx - 15 * dir} 612 Z`} fill={c} />
      <path d={`M ${cx - 15 * dir} 610 L ${cx + 19 * dir} 610 L ${cx + 19 * dir} 614 L ${cx - 15 * dir} 614 Z`} fill={dk} />
      <path d={`M ${cx + 12 * dir} 594 l ${-5 * dir} -4 l 0 8 Z M ${cx + 12 * dir} 594 l ${5 * dir} -4 l 0 8 Z`} fill={dk} />
    </g>
  )
  return (
    <g>
      {foot(186, -1)}
      {foot(234, 1)}
    </g>
  )
}

/** Sandália: tiras + sola. */
const sandals: ShoeDraw = (c) => {
  const dk = shade(c, -30)
  const foot = (cx: number, dir: number, skinless = false) => (
    <g>
      {!skinless && (
        <>
          <path d={`M ${cx - 12 * dir} 580 L ${cx + 10 * dir} 580`} stroke={c} strokeWidth="4" />
          <path d={`M ${cx - 10 * dir} 592 L ${cx + 8 * dir} 600`} stroke={c} strokeWidth="4" />
        </>
      )}
      <path d={`M ${cx - 16 * dir} 608 L ${cx + 20 * dir} 608 L ${cx + 20 * dir} 614 L ${cx - 16 * dir} 614 Z`} fill={dk} />
    </g>
  )
  return (
    <g>
      {foot(186, -1)}
      {foot(234, 1)}
    </g>
  )
}

/** Bota: cano até a canela. */
const boots: ShoeDraw = (c) => {
  const dk = shade(c, -30)
  const foot = (cx: number, dir: number) => (
    <g>
      <path d={`M ${cx - 13} 520 L ${cx + 13} 520 C ${cx + 15} 556 ${cx + 14} 580 ${cx + 12 * dir > 0 ? cx + 13 : cx + 13} 588 L ${cx + 18 * dir} 592 C ${cx + 24 * dir} 598 ${cx + 24 * dir} 608 ${cx + 22 * dir} 612 L ${cx - 14 * dir} 612 C ${cx - 16} 600 ${cx - 15} 556 ${cx - 13} 520 Z`} fill={c} />
      <path d={`M ${cx - 13} 520 L ${cx + 13} 520 L ${cx + 12} 532 L ${cx - 12} 532 Z`} fill={dk} />
      <path d={`M ${cx - 14 * dir} 608 L ${cx + 22 * dir} 608 L ${cx + 22 * dir} 614 L ${cx - 14 * dir} 614 Z`} fill={dk} />
    </g>
  )
  return (
    <g>
      {foot(186, -1)}
      {foot(234, 1)}
    </g>
  )
}

function shoe(id: string, name: string, draw: ShoeDraw, colors: string[], tall = false): Item {
  return {
    id,
    name,
    category: 'sapatos',
    sub: name.split(' ')[0],
    slot: 'shoes',
    colors,
    render: ({ color }) => draw(color),
    thumbBox: tall ? [140, 500, 140, 130] : [140, 565, 140, 65],
  }
}

export const SHOES_ITEMS: Item[] = [
  shoe('tenis-rosa', 'Tênis Rosa', sneaker, ['#F48FB1', '#90CAF9', '#FFFFFF']),
  shoe('tenis-azul', 'Tênis Azul', sneaker, ['#90CAF9', '#A5D6A7', '#FFF59D']),
  shoe('tenis-branco', 'Tênis Branquinho', sneaker, ['#F5F5F5', '#F48FB1', '#CE93D8']),
  shoe('salto-vermelho', 'Salto Poderoso', heels, ['#E53935', '#F48FB1', '#37474F']),
  shoe('salto-rosa', 'Salto Princesa', heels, ['#F48FB1', '#CE93D8', '#FFF59D']),
  shoe('salto-preto', 'Salto Clássico', heels, ['#37474F', '#7E57C2', '#E53935']),
  shoe('sapatilha-laco', 'Sapatilha Lacinho', flats, ['#F9A8D4', '#90CAF9', '#FFF59D']),
  shoe('sapatilha-lilas', 'Sapatilha Lilás', flats, ['#CE93D8', '#A5D6A7', '#FFAB91']),
  shoe('sapatilha-dourada', 'Sapatilha Dourada', flats, ['#E8C26E', '#F5F5F5', '#F48FB1']),
  shoe('sandalia-verao', 'Sandália de Verão', sandals, ['#FFAB91', '#F48FB1', '#A5D6A7']),
  shoe('sandalia-praia', 'Sandália Praia', sandals, ['#90CAF9', '#FFF59D', '#CE93D8']),
  shoe('sandalia-festa', 'Sandália de Festa', sandals, ['#E8C26E', '#F48FB1', '#FFFFFF']),
  shoe('bota-aventura', 'Bota Aventureira', boots, ['#A1887F', '#37474F', '#F48FB1'], true),
  shoe('bota-fashion', 'Bota Fashion', boots, ['#37474F', '#CE93D8', '#E53935'], true),
  shoe('bota-rosa', 'Bota Rosa Choque', boots, ['#F472B6', '#90CAF9', '#FFF59D'], true),
]
