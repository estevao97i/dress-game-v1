import type { Item } from '../types'
import { EYE_COLORS } from './palette'
import { shade } from '../utils/color'

/*
 * Rosto — olhos (178,150) e (242,150), sobrancelhas y≈118,
 * nariz (210,180), boca (210,204).
 */

const EYE_L = 178
const EYE_R = 242
const EYE_Y = 150

/** Um olho completo: branco, íris, pupila e brilhos. */
function eye(cx: number, color: string, rx: number, ry: number, lash: boolean) {
  return (
    <g>
      <ellipse cx={cx} cy={EYE_Y} rx={rx} ry={ry} fill="#FFFFFF" />
      <circle cx={cx} cy={EYE_Y + 2} r={rx * 0.62} fill={color} />
      <circle cx={cx} cy={EYE_Y + 2} r={rx * 0.32} fill="#241A20" />
      <circle cx={cx - rx * 0.25} cy={EYE_Y - ry * 0.25} r={rx * 0.2} fill="#FFFFFF" />
      <circle cx={cx + rx * 0.3} cy={EYE_Y + ry * 0.3} r={rx * 0.1} fill="#FFFFFF" opacity="0.8" />
      {/* contorno superior */}
      <path
        d={`M ${cx - rx} ${EYE_Y - 2} Q ${cx} ${EYE_Y - ry - 4} ${cx + rx} ${EYE_Y - 2}`}
        stroke="#241A20"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      {lash && (
        <>
          <path d={`M ${cx + rx - 2} ${EYE_Y - ry * 0.5} q 8 -4 12 -10`} stroke="#241A20" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d={`M ${cx - rx + 2} ${EYE_Y - ry * 0.5} q -8 -4 -12 -10`} stroke="#241A20" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
    </g>
  )
}

function eyesItem(id: string, name: string, rx: number, ry: number, lash: boolean): Item {
  return {
    id,
    name,
    category: 'rosto',
    sub: 'Olhos',
    slot: 'eyes',
    colors: EYE_COLORS,
    render: ({ color }) => (
      <g className="anim-blink">
        {eye(EYE_L, color, rx, ry, lash)}
        {eye(EYE_R, color, rx, ry, lash)}
      </g>
    ),
    thumbBox: [140, 105, 140, 90],
  }
}

const EYES: Item[] = [
  eyesItem('olhos-redondos', 'Redondos', 15, 18, false),
  eyesItem('olhos-grandes', 'Grandes Kawaii', 17, 21, false),
  eyesItem('olhos-cilios', 'Com Cílios', 15, 18, true),
  eyesItem('olhos-amendoados', 'Amendoados', 16, 14, true),
]

function browsItem(id: string, name: string, d: (cx: number, flip: number) => string, width = 4): Item {
  return {
    id,
    name,
    category: 'rosto',
    sub: 'Sobrancelhas',
    slot: 'brows',
    colors: ['#5C4033', '#3B2A33', '#8A5A2B', '#C98A4B'],
    render: ({ color }) => (
      <g stroke={color} strokeWidth={width} strokeLinecap="round" fill="none">
        <path d={d(EYE_L, 1)} />
        <path d={d(EYE_R, -1)} />
      </g>
    ),
    thumbBox: [140, 95, 140, 60],
  }
}

const BROWS: Item[] = [
  browsItem('sobrancelha-arco', 'Arco Suave', (cx) => `M ${cx - 14} 122 Q ${cx} 112 ${cx + 14} 120`),
  browsItem('sobrancelha-reta', 'Retinha', (cx) => `M ${cx - 14} 118 L ${cx + 14} 118`),
  browsItem('sobrancelha-expressiva', 'Expressiva', (cx, f) => `M ${cx - 14 * f} 124 Q ${cx} 108 ${cx + 15 * f} 118`, 5),
  browsItem('sobrancelha-fininha', 'Fininha', (cx) => `M ${cx - 13} 121 Q ${cx} 113 ${cx + 13} 119`, 2.5),
]

const NOSES: Item[] = [
  {
    id: 'nariz-botao',
    name: 'Botãozinho',
    category: 'rosto',
    sub: 'Nariz',
    slot: 'nose',
    render: ({ skin }) => (
      <path d="M205 176 Q210 184 215 176" stroke={shade(skin, -55)} strokeWidth="3.4" strokeLinecap="round" fill="none" />
    ),
    thumbBox: [180, 158, 60, 40],
  },
  {
    id: 'nariz-pontinho',
    name: 'Pontinho',
    category: 'rosto',
    sub: 'Nariz',
    slot: 'nose',
    render: ({ skin }) => <ellipse cx="210" cy="179" rx="4" ry="3" fill={shade(skin, -45)} opacity="0.7" />,
    thumbBox: [180, 158, 60, 40],
  },
  {
    id: 'nariz-arrebitado',
    name: 'Arrebitado',
    category: 'rosto',
    sub: 'Nariz',
    slot: 'nose',
    render: ({ skin }) => (
      <path d="M212 170 Q216 178 208 181" stroke={shade(skin, -55)} strokeWidth="3.2" strokeLinecap="round" fill="none" />
    ),
    thumbBox: [180, 158, 60, 40],
  },
]

function mouthItem(id: string, name: string, node: React.ReactNode): Item {
  return {
    id,
    name,
    category: 'rosto',
    sub: 'Boca',
    slot: 'mouth',
    render: () => <>{node}</>,
    thumbBox: [175, 185, 70, 45],
  }
}

const MOUTHS: Item[] = [
  mouthItem('boca-sorriso', 'Sorriso', (
    <path d="M196 202 Q210 214 224 202" stroke="#B5566B" strokeWidth="4" strokeLinecap="round" fill="none" />
  )),
  mouthItem('boca-sorrisao', 'Sorrisão', (
    <g>
      <path d="M192 200 Q210 224 228 200 Q210 208 192 200 Z" fill="#A6485F" />
      <path d="M200 209 Q210 218 220 209 Q210 214 200 209 Z" fill="#E2849B" />
    </g>
  )),
  mouthItem('boca-surpresa', 'Surpresinha', <ellipse cx="210" cy="205" rx="7" ry="9" fill="#A6485F" />),
  mouthItem('boca-timida', 'Tímida', (
    <path d="M201 204 Q210 210 219 204" stroke="#B5566B" strokeWidth="3.4" strokeLinecap="round" fill="none" />
  )),
  mouthItem('boca-gatinho', 'Gatinho', (
    <path d="M196 202 Q203 210 210 202 Q217 210 224 202" stroke="#B5566B" strokeWidth="3.6" strokeLinecap="round" fill="none" />
  )),
]

export const FACE_ITEMS: Item[] = [...EYES, ...BROWS, ...NOSES, ...MOUTHS]
