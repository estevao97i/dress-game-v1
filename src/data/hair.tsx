import type { Item, RenderCtx } from '../types'
import { HAIR_COLORS } from './palette'
import { shade } from '../utils/color'

/*
 * Cabelos — cada estilo tem uma camada de trás (atrás do corpo)
 * e uma camada da frente (coroa/franja sobre a cabeça).
 * Referências da cabeça: topo y=54, laterais x=124/296, queixo y=240.
 */

/** Coroa com franja repartida ao meio. */
function crownParted(c: string) {
  const dk = shade(c, -30)
  const hi = shade(c, 36)
  return (
    <g>
      <path
        d="M120 156 C116 76 160 44 210 44 C260 44 304 76 300 156 C300 118 284 96 264 100 C272 124 268 142 262 152 C258 116 240 100 212 98 C212 98 214 88 210 80 C206 88 208 98 208 98 C180 100 162 116 158 152 C152 142 148 124 156 100 C136 96 120 118 120 156 Z"
        fill={c}
      />
      <path d="M210 80 C206 88 208 98 208 98 L212 98 C214 88 210 80 210 80 Z" fill={dk} opacity="0.5" />
      <path d="M150 70 C168 54 192 48 210 48 C196 56 176 64 162 84 Z" fill={hi} opacity="0.7" />
    </g>
  )
}

/** Coroa com franja reta (estilo boneca). */
function crownBangs(c: string) {
  const dk = shade(c, -30)
  const hi = shade(c, 36)
  return (
    <g>
      <path
        d="M120 158 C116 76 160 44 210 44 C260 44 304 76 300 158 C300 130 290 112 282 108 C284 118 282 124 278 128 C272 110 266 104 262 102 C264 114 262 120 258 124 C250 106 244 100 238 98 C239 110 237 116 233 120 C226 104 218 98 210 97 C202 98 194 104 187 120 C183 116 181 110 182 98 C176 100 170 106 162 124 C158 120 156 114 158 102 C154 104 148 110 142 128 C138 124 136 118 138 108 C130 112 120 130 120 158 Z"
        fill={c}
      />
      <path d="M150 68 C170 52 194 47 212 48 C198 56 178 62 164 82 Z" fill={hi} opacity="0.7" />
      <path d="M120 158 C121 140 126 122 134 112 C128 130 126 146 126 158 Z" fill={dk} opacity="0.45" />
    </g>
  )
}

/** Coroa com franja lateral. */
function crownSide(c: string) {
  const dk = shade(c, -30)
  const hi = shade(c, 36)
  return (
    <g>
      <path
        d="M120 156 C116 76 160 44 210 44 C260 44 304 76 300 156 C300 120 286 98 268 100 C240 92 170 92 150 124 C140 132 124 140 120 156 Z"
        fill={c}
      />
      <path
        d="M150 124 C176 96 250 92 268 100 C254 110 240 116 228 116 C200 116 168 118 150 124 Z"
        fill={dk}
        opacity="0.35"
      />
      <path d="M152 68 C172 52 196 47 214 48 C200 56 180 62 166 82 Z" fill={hi} opacity="0.7" />
    </g>
  )
}

/** Cabelo de trás liso até a cintura. */
function backLong(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M122 120 C122 52 298 52 298 120 L304 380 C306 416 286 432 262 424 L250 438 C226 452 194 452 170 438 L158 424 C134 432 114 416 116 380 Z"
        fill={c}
      />
      <path d="M122 120 C124 200 120 320 126 392 C112 380 114 340 116 300 Z" fill={dk} opacity="0.4" />
      <path d="M298 120 C296 200 300 320 294 392 C308 380 306 340 304 300 Z" fill={dk} opacity="0.4" />
    </g>
  )
}

/** Cabelo de trás médio (até os ombros). */
function backMedium(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M122 118 C122 52 298 52 298 118 L302 280 C302 310 278 320 258 310 C228 326 192 326 162 310 C142 320 118 310 118 280 Z"
        fill={c}
      />
      <path d="M122 118 C123 170 120 240 124 290 C112 282 116 250 116 220 Z" fill={dk} opacity="0.4" />
    </g>
  )
}

/** Cabelo de trás curto (chanel/bob). */
function backBob(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M122 118 C122 52 298 52 298 118 L302 218 C304 248 282 262 258 254 C228 268 192 268 162 254 C138 262 116 248 118 218 Z"
        fill={c}
      />
      <path d="M298 118 C297 160 300 200 296 240 C310 230 304 196 304 170 Z" fill={dk} opacity="0.4" />
    </g>
  )
}

/** Cabelo de trás ondulado e longo. */
function backWavy(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M122 118 C122 52 298 52 298 118 C312 160 296 190 310 230 C322 268 300 290 312 330 C320 366 296 400 268 392 C282 372 270 352 278 330 C262 348 246 344 240 330 C246 356 234 372 214 372 C194 372 182 356 188 330 C182 344 166 348 150 330 C158 352 146 372 160 392 C132 400 108 366 116 330 C128 290 106 268 118 230 C132 190 116 160 122 118 Z"
        fill={c}
      />
      <path d="M122 118 C116 160 132 190 118 230 C110 264 128 288 118 320 C104 290 122 268 110 234 C122 196 110 158 122 118 Z" fill={dk} opacity="0.4" />
    </g>
  )
}

/** Cabelo de trás cacheado (cachos volumosos). */
function backCurly(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M122 118 C122 52 298 52 298 118 L300 200 C300 240 290 270 270 290 C240 312 180 312 150 290 C130 270 120 240 120 200 Z"
        fill={c}
      />
      {[
        [118, 150], [114, 196], [120, 242], [134, 282], [158, 308],
        [302, 150], [306, 196], [300, 242], [286, 282], [262, 308],
        [190, 318], [230, 318],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 26 : 22} fill={c} />
      ))}
      {[
        [114, 196], [134, 282], [306, 196], [286, 282], [210, 320],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill={dk} opacity="0.3" />
      ))}
    </g>
  )
}

/** Maria-chiquinha: dois rabinhos laterais. */
function backPigtails(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M126 130 C108 142 84 170 80 220 C76 270 92 310 110 330 C124 344 140 336 134 318 C120 282 118 220 134 170 Z"
        fill={c}
      />
      <path
        d="M294 130 C312 142 336 170 340 220 C344 270 328 310 310 330 C296 344 280 336 286 318 C300 282 302 220 286 170 Z"
        fill={c}
      />
      <path d="M80 220 C78 264 90 302 108 326 C96 300 88 260 92 220 Z" fill={dk} opacity="0.4" />
      <path d="M340 220 C342 264 330 302 312 326 C324 300 332 260 328 220 Z" fill={dk} opacity="0.4" />
      {/* xuxinhas */}
      <circle cx="131" cy="148" r="9" fill={shade(c, -60)} />
      <circle cx="289" cy="148" r="9" fill={shade(c, -60)} />
    </g>
  )
}

/** Rabo de cavalo alto. */
function backPonytail(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path
        d="M210 50 C260 36 300 70 306 130 C314 200 304 280 286 330 C276 356 252 352 258 326 C272 268 276 190 262 130 C254 96 234 76 210 70 Z"
        fill={c}
      />
      <path d="M306 130 C310 200 300 290 284 334 C296 300 304 220 298 150 Z" fill={dk} opacity="0.4" />
      <ellipse cx="232" cy="62" rx="12" ry="9" fill={shade(c, -60)} transform="rotate(20 232 62)" />
      <path d="M118 230 C112 170 130 90 210 50 L240 70 C170 100 140 170 142 230 Z" fill={c} opacity="0" />
    </g>
  )
}

/** Trança lateral. */
function backBraid(c: string) {
  const dk = shade(c, -30)
  return (
    <g>
      <path d="M122 118 C122 52 298 52 298 118 L300 180 C300 210 286 224 262 220 C230 232 190 232 158 220 C134 224 120 210 120 180 Z" fill={c} />
      {/* gomos da trança */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <ellipse
            cx={272 + (i % 2 === 0 ? -5 : 5)}
            cy={224 + i * 36}
            rx="20"
            ry="22"
            fill={c}
          />
          <path
            d={`M ${258 + (i % 2 === 0 ? -5 : 5)} ${216 + i * 36} Q ${272 + (i % 2 === 0 ? -5 : 5)} ${228 + i * 36} ${286 + (i % 2 === 0 ? -5 : 5)} ${216 + i * 36}`}
            stroke={dk}
            strokeWidth="3"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}
      {/* pontinha + lacinho */}
      <path d="M262 428 C266 448 278 448 282 428 Z" fill={c} />
      <circle cx="272" cy="430" r="8" fill="#F472B6" />
    </g>
  )
}

/** Coque alto com bolinha. */
function frontBun(c: string) {
  const hi = shade(c, 36)
  const dk = shade(c, -30)
  return (
    <g>
      <circle cx="210" cy="42" r="32" fill={c} />
      <path d="M186 30 C196 20 226 20 234 32 C224 26 198 26 186 30 Z" fill={hi} opacity="0.8" />
      <circle cx="210" cy="42" r="32" fill="none" stroke={dk} strokeWidth="3" opacity="0.25" />
      <path d="M178 58 Q210 74 242 58" stroke={shade(c, -60)} strokeWidth="6" fill="none" />
      {crownSide(c)}
    </g>
  )
}

/** Monta os dois colorways de cada estilo. */
function variants(
  base: string,
  name: string,
  front: (c: string) => React.ReactNode,
  back: ((c: string) => React.ReactNode) | null,
  colorA: string,
  colorB: string,
): Item[] {
  const make = (suffix: string, color: string): Item => ({
    id: `cabelo-${base}-${suffix}`,
    name,
    category: 'cabelo',
    sub: 'Cabelos',
    slot: 'hair',
    colors: [color, ...HAIR_COLORS.filter((h) => h !== color)],
    render: (ctx: RenderCtx) => front(ctx.color),
    renderBack: back ? (ctx: RenderCtx) => back(ctx.color) : undefined,
    thumbBox: [60, 20, 300, 300],
  })
  return [make('a', colorA), make('b', colorB)]
}

export const HAIR_ITEMS: Item[] = [
  ...variants('longo-liso', 'Longo Liso', crownParted, backLong, '#5C3A21', '#F2C879'),
  ...variants('franjinha', 'Longo c/ Franja', crownBangs, backLong, '#3B2A33', '#F48FB1'),
  ...variants('medio', 'Médio', crownSide, backMedium, '#8A5A2B', '#B39DDB'),
  ...variants('chanel', 'Curto Chanel', crownBangs, backBob, '#C9572B', '#3B2A33'),
  ...variants('ondulado', 'Ondulado', crownSide, backWavy, '#C98A4B', '#7EB6E8'),
  ...variants('cacheado', 'Cacheado', crownParted, backCurly, '#3B2A33', '#C9572B'),
  ...variants('coque', 'Coque Alto', frontBun, null, '#5C3A21', '#ECECEC'),
  ...variants('chiquinha', 'Maria-Chiquinha', crownBangs, backPigtails, '#F2C879', '#F48FB1'),
  ...variants('rabo', 'Rabo de Cavalo', crownSide, backPonytail, '#8A5A2B', '#3B2A33'),
  ...variants('tranca', 'Trança Lateral', crownParted, backBraid, '#C98A4B', '#5C3A21'),
]
