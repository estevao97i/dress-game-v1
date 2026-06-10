import type { Item } from '../types'
import { LIP_COLORS, SHADOW_COLORS } from './palette'
import { shade } from '../utils/color'

/*
 * Maquiagem — desenhada sobre o rosto.
 * Olhos em (178,150)/(242,150), bochechas (156,184)/(264,184), boca (210,204).
 */

const MAKEUP_ITEMS: Item[] = [
  // ---- batons (cobrem a boca com lábios cheios) ----
  {
    id: 'batom-classico',
    name: 'Batom Clássico',
    category: 'maquiagem',
    sub: 'Batom',
    slot: 'lipstick',
    colors: LIP_COLORS,
    render: ({ color }) => (
      <g>
        <path
          d="M194 200 Q202 192 210 199 Q218 192 226 200 Q220 215 210 215 Q200 215 194 200 Z"
          fill={color}
        />
        <path d="M199 206 Q210 212 221 206 Q210 209 199 206 Z" fill={shade(color, 50)} opacity="0.6" />
      </g>
    ),
    thumbBox: [175, 182, 70, 48],
  },
  {
    id: 'batom-coracao',
    name: 'Batom Coração',
    category: 'maquiagem',
    sub: 'Batom',
    slot: 'lipstick',
    colors: ['#C62828', ...LIP_COLORS.filter((c) => c !== '#C62828')],
    render: ({ color }) => (
      <path
        d="M210 198 C206 190 194 192 195 201 C196 210 204 214 210 216 C216 214 224 210 225 201 C226 192 214 190 210 198 Z"
        fill={color}
      />
    ),
    thumbBox: [175, 182, 70, 48],
  },
  {
    id: 'gloss',
    name: 'Gloss Brilhante',
    category: 'maquiagem',
    sub: 'Batom',
    slot: 'lipstick',
    colors: ['#FF8A65', ...LIP_COLORS.filter((c) => c !== '#FF8A65')],
    render: ({ color }) => (
      <g>
        <path d="M195 201 Q210 194 225 201 Q218 213 210 213 Q202 213 195 201 Z" fill={color} opacity="0.85" />
        <ellipse cx="204" cy="202" rx="4" ry="2" fill="#FFFFFF" opacity="0.8" />
      </g>
    ),
    thumbBox: [175, 182, 70, 48],
  },

  // ---- blush ----
  {
    id: 'blush-suave',
    name: 'Blush Suave',
    category: 'maquiagem',
    sub: 'Blush',
    slot: 'blush',
    colors: ['#F8A5BE', '#F48FB1', '#FFAB91'],
    render: ({ color }) => (
      <g opacity="0.5">
        <ellipse cx="156" cy="186" rx="15" ry="9" fill={color} />
        <ellipse cx="264" cy="186" rx="15" ry="9" fill={color} />
      </g>
    ),
    thumbBox: [130, 160, 160, 60],
  },
  {
    id: 'blush-bonequinha',
    name: 'Blush Bonequinha',
    category: 'maquiagem',
    sub: 'Blush',
    slot: 'blush',
    colors: ['#F47B9D', '#EF9A9A'],
    render: ({ color }) => (
      <g>
        <circle cx="156" cy="186" r="11" fill={color} opacity="0.65" />
        <circle cx="264" cy="186" r="11" fill={color} opacity="0.65" />
        <g stroke={shade(color, -40)} strokeWidth="2" opacity="0.5">
          <line x1="149" y1="182" x2="155" y2="190" />
          <line x1="156" y1="181" x2="162" y2="189" />
          <line x1="257" y1="182" x2="263" y2="190" />
          <line x1="264" y1="181" x2="270" y2="189" />
        </g>
      </g>
    ),
    thumbBox: [130, 160, 160, 60],
  },

  // ---- sombras ----
  {
    id: 'sombra-pastel',
    name: 'Sombra Pastel',
    category: 'maquiagem',
    sub: 'Sombra',
    slot: 'eyeshadow',
    colors: SHADOW_COLORS,
    render: ({ color }) => (
      <g opacity="0.7">
        <path d="M162 138 Q178 122 194 138 Q178 130 162 138 Z" fill={color} />
        <path d="M226 138 Q242 122 258 138 Q242 130 226 138 Z" fill={color} />
      </g>
    ),
    thumbBox: [140, 105, 140, 70],
  },
  {
    id: 'sombra-esfumada',
    name: 'Sombra Esfumada',
    category: 'maquiagem',
    sub: 'Sombra',
    slot: 'eyeshadow',
    colors: ['#CE93D8', ...SHADOW_COLORS.filter((c) => c !== '#CE93D8')],
    render: ({ color }) => (
      <g>
        <path d="M158 140 Q178 116 198 140 Q178 126 158 140 Z" fill={color} opacity="0.8" />
        <path d="M222 140 Q242 116 262 140 Q242 126 222 140 Z" fill={color} opacity="0.8" />
        <path d="M162 134 Q178 114 196 132" stroke={shade(color, -40)} strokeWidth="5" opacity="0.35" fill="none" />
        <path d="M224 132 Q242 114 258 134" stroke={shade(color, -40)} strokeWidth="5" opacity="0.35" fill="none" />
      </g>
    ),
    thumbBox: [140, 105, 140, 70],
  },
  {
    id: 'sombra-glitter',
    name: 'Sombra c/ Glitter',
    category: 'maquiagem',
    sub: 'Sombra',
    slot: 'eyeshadow',
    colors: ['#F8BBD0', '#90CAF9', '#FFCC80'],
    render: ({ color }) => (
      <g>
        <path d="M162 138 Q178 120 194 138 Q178 129 162 138 Z" fill={color} opacity="0.75" />
        <path d="M226 138 Q242 120 258 138 Q242 129 226 138 Z" fill={color} opacity="0.75" />
        {[
          [170, 130], [184, 127], [234, 127], [248, 130],
        ].map(([x, y], i) => (
          <path key={i} d={`M ${x} ${y - 3} L ${x + 1.4} ${y} L ${x + 4} ${y + 1} L ${x + 1.4} ${y + 2} L ${x} ${y + 5} L ${x - 1.4} ${y + 2} L ${x - 4} ${y + 1} L ${x - 1.4} ${y} Z`} fill="#FFFFFF" opacity="0.95" />
        ))}
      </g>
    ),
    thumbBox: [140, 105, 140, 70],
  },

  // ---- delineadores ----
  {
    id: 'delineador-gatinho',
    name: 'Delineado Gatinho',
    category: 'maquiagem',
    sub: 'Delineador',
    slot: 'eyeliner',
    render: () => (
      <g stroke="#241A20" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M163 137 Q 178 127 193 137" />
        <path d="M227 137 Q 242 127 257 137" />
        <path d="M164 136 q -8 -4 -12 -10" />
        <path d="M256 136 q 8 -4 12 -10" />
      </g>
    ),
    thumbBox: [140, 105, 140, 70],
  },
  {
    id: 'delineador-simples',
    name: 'Delineado Fininho',
    category: 'maquiagem',
    sub: 'Delineador',
    slot: 'eyeliner',
    render: () => (
      <g stroke="#241A20" strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M163 136 Q 178 126 193 136" />
        <path d="M227 136 Q 242 126 257 136" />
      </g>
    ),
    thumbBox: [140, 105, 140, 70],
  },
]

export { MAKEUP_ITEMS }
