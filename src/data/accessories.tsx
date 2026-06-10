import type { Item } from '../types'
import { shade } from '../utils/color'

/*
 * Acessórios — pontos de referência:
 *  orelhas (120,168)/(300,168) · pescoço base y≈266 · peito (210,290)
 *  pulsos (146,392)/(274,392) · topo da cabeça y≈50 · olhos (178,150)/(242,150)
 */

function acc(
  id: string,
  name: string,
  sub: string,
  slot: Item['slot'],
  colors: string[] | undefined,
  render: Item['render'],
  thumbBox: [number, number, number, number],
): Item {
  return { id, name, category: 'acessorios', sub, slot, colors, render, thumbBox }
}

export const ACC_ITEMS: Item[] = [
  // ---- brincos ----
  acc('brinco-argola', 'Argolinhas', 'Brincos', 'earrings', ['#E8C26E', '#C0C0C0', '#F48FB1'], ({ color }) => (
    <g stroke={color} strokeWidth="3.4" fill="none">
      <circle cx="120" cy="180" r="8" />
      <circle cx="300" cy="180" r="8" />
    </g>
  ), [95, 150, 60, 55]),
  acc('brinco-perola', 'Perolinhas', 'Brincos', 'earrings', ['#FDF6EC', '#F8BBD0', '#B3E5FC'], ({ color }) => (
    <g>
      <circle cx="120" cy="172" r="5.5" fill={color} />
      <circle cx="300" cy="172" r="5.5" fill={color} />
      <circle cx="118.5" cy="170.5" r="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="298.5" cy="170.5" r="2" fill="#FFFFFF" opacity="0.9" />
    </g>
  ), [95, 150, 60, 45]),
  acc('brinco-estrela', 'Estrelinhas', 'Brincos', 'earrings', ['#FFD54F', '#F48FB1', '#90CAF9'], ({ color }) => {
    const s = (x: number, y: number) => (
      <path d={`M ${x} ${y - 7} L ${x + 2.2} ${y - 2.2} L ${x + 7} ${y} L ${x + 2.2} ${y + 2.2} L ${x} ${y + 7} L ${x - 2.2} ${y + 2.2} L ${x - 7} ${y} L ${x - 2.2} ${y - 2.2} Z`} fill={color} />
    )
    return (
      <g>
        {s(120, 175)}
        {s(300, 175)}
      </g>
    )
  }, [95, 150, 60, 50]),

  // ---- colares ----
  acc('colar-perolas', 'Colar de Pérolas', 'Colares', 'necklace', ['#FDF6EC', '#F8BBD0'], ({ color }) => (
    <g>
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={210 + i * 11} cy={272 + Math.abs(i) * -2 + 8 - (i * i) / 3} r="4.4" fill={color} stroke={shade(color, -25)} strokeWidth="0.8" />
      ))}
    </g>
  ), [150, 250, 120, 50]),
  acc('colar-coracao', 'Pingente Coração', 'Colares', 'necklace', ['#E8C26E', '#C0C0C0'], ({ color }) => (
    <g>
      <path d="M186 264 Q 210 286 234 264" stroke={color} strokeWidth="2.6" fill="none" />
      <path d="M210 286 c -3 -5 -9 -1.5 -5.5 3.5 c 2 2.8 3.7 4 5.5 5.5 c 1.8 -1.5 3.5 -2.7 5.5 -5.5 c 3.5 -5 -2.5 -8.5 -5.5 -3.5 Z" fill="#EC4899" stroke={color} strokeWidth="1" />
    </g>
  ), [150, 250, 120, 55]),
  acc('gargantilha', 'Gargantilha Laço', 'Colares', 'necklace', ['#F48FB1', '#37474F', '#CE93D8'], ({ color }) => (
    <g>
      <path d="M194 262 L 226 262 L 226 270 L 194 270 Z" fill={color} />
      <path d="M210 266 l -7 -5 l 0 10 Z M 210 266 l 7 -5 l 0 10 Z" fill={shade(color, -30)} />
      <circle cx="210" cy="266" r="2.4" fill={shade(color, 50)} />
    </g>
  ), [165, 245, 90, 40]),

  // ---- pulseiras ----
  acc('pulseira-missangas', 'Pulseira Miçangas', 'Pulseiras', 'bracelet', ['#F48FB1', '#90CAF9', '#A5D6A7'], ({ color }) => (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={140 + i * 5.4} cy={384 - i * 1} r="3.2" fill={i % 2 ? shade(color, -30) : color} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={264 + i * 5.4} cy={381 + i * 1} r="3.2" fill={i % 2 ? shade(color, -30) : color} />
      ))}
    </g>
  ), [120, 360, 80, 50]),
  acc('pulseira-dourada', 'Pulseira Dourada', 'Pulseiras', 'bracelet', ['#E8C26E', '#C0C0C0'], ({ color }) => (
    <g stroke={color} strokeWidth="3" fill="none">
      <path d="M138 382 Q 147 388 156 381" />
      <path d="M262 381 Q 271 388 280 382" />
    </g>
  ), [120, 360, 80, 45]),

  // ---- cabeça ----
  acc('tiara-brilhante', 'Tiara Brilhante', 'Tiaras & Laços', 'headwear', ['#F48FB1', '#CE93D8', '#90CAF9'], ({ color }) => (
    <g>
      <path d="M138 92 C 158 64 262 64 282 92 L 276 98 C 256 74 164 74 144 98 Z" fill={color} />
      <circle cx="210" cy="70" r="6" fill="#FFFFFF" />
      <circle cx="178" cy="76" r="4" fill={shade(color, 60)} />
      <circle cx="242" cy="76" r="4" fill={shade(color, 60)} />
    </g>
  ), [120, 50, 180, 70]),
  acc('coroa-princesa', 'Coroa de Princesa', 'Tiaras & Laços', 'headwear', ['#E8C26E', '#F48FB1'], ({ color }) => (
    <g>
      <path d="M178 64 L 184 38 L 198 56 L 210 32 L 222 56 L 236 38 L 242 64 Z" fill={color} />
      <path d="M178 64 L242 64 L240 72 L180 72 Z" fill={shade(color, -25)} />
      <circle cx="210" cy="46" r="3.4" fill="#EC4899" />
      <circle cx="188" cy="52" r="2.6" fill="#38BDF8" />
      <circle cx="232" cy="52" r="2.6" fill="#38BDF8" />
    </g>
  ), [160, 20, 100, 70]),
  acc('laco-grande', 'Laço Grandão', 'Tiaras & Laços', 'headwear', ['#F472B6', '#90CAF9', '#FFF59D', '#CE93D8'], ({ color }) => (
    <g>
      <path d="M262 76 C 248 60 232 62 234 78 C 235 90 248 96 262 94 C 276 96 290 92 292 80 C 294 66 276 60 262 76 Z" fill={color} />
      <path d="M262 76 C 252 64 240 66 242 77 C 243 86 252 90 262 88 Z" fill={shade(color, -25)} opacity="0.6" />
      <circle cx="262" cy="82" r="7" fill={shade(color, -35)} />
    </g>
  ), [215, 45, 100, 70]),
  acc('faixa-flor', 'Faixa com Flor', 'Tiaras & Laços', 'headwear', ['#A5D6A7', '#F9A8D4', '#FFF59D'], ({ color }) => (
    <g>
      <path d="M126 110 C 150 82 270 82 294 110 L 290 120 C 266 94 154 94 130 120 Z" fill={color} />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={152 + 12 * Math.cos((a * Math.PI) / 180)} cy={100 + 12 * Math.sin((a * Math.PI) / 180)} rx="7" ry="5" fill="#F9A8D4" transform={`rotate(${a} ${152 + 12 * Math.cos((a * Math.PI) / 180)} ${100 + 12 * Math.sin((a * Math.PI) / 180)})`} />
      ))}
      <circle cx="152" cy="100" r="5.5" fill="#FFF59D" />
    </g>
  ), [110, 60, 200, 80]),

  // ---- óculos ----
  acc('oculos-redondo', 'Óculos Redondinho', 'Óculos', 'glasses', ['#37474F', '#E8C26E', '#F48FB1'], ({ color }) => (
    <g stroke={color} strokeWidth="3.6" fill="rgba(255,255,255,0.18)">
      <circle cx="178" cy="152" r="20" />
      <circle cx="242" cy="152" r="20" />
      <path d="M198 150 Q 210 144 222 150" fill="none" />
      <path d="M158 148 L 128 142 M 262 148 L 292 142" fill="none" />
    </g>
  ), [130, 115, 160, 75]),
  acc('oculos-gatinho', 'Óculos Gatinho', 'Óculos', 'glasses', ['#7E57C2', '#F48FB1', '#37474F'], ({ color }) => (
    <g>
      <path d="M156 140 L 200 142 L 196 166 L 162 166 Z M 156 140 L 150 132 L 154 144 Z" fill="rgba(255,255,255,0.18)" stroke={color} strokeWidth="3.4" />
      <path d="M264 140 L 220 142 L 224 166 L 258 166 Z M 264 140 L 270 132 L 266 144 Z" fill="rgba(255,255,255,0.18)" stroke={color} strokeWidth="3.4" />
      <path d="M200 148 Q 210 144 220 148" fill="none" stroke={color} strokeWidth="3.4" />
    </g>
  ), [130, 115, 160, 70]),
  acc('oculos-coracao', 'Óculos de Coração', 'Óculos', 'glasses', ['#EC4899', '#E53935', '#7E57C2'], ({ color }) => (
    <g>
      <path d="M178 140 c -7 -11 -22 -3 -13 8 c 5 6.5 9 9.5 13 13 c 4 -3.5 8 -6.5 13 -13 c 9 -11 -6 -19 -13 -8 Z" fill={color} opacity="0.85" />
      <path d="M242 140 c -7 -11 -22 -3 -13 8 c 5 6.5 9 9.5 13 13 c 4 -3.5 8 -6.5 13 -13 c 9 -11 -6 -19 -13 -8 Z" fill={color} opacity="0.85" />
      <path d="M196 150 Q 210 146 224 150" fill="none" stroke={color} strokeWidth="3.4" />
    </g>
  ), [140, 118, 140, 60]),
]
