import type { Item } from '../types'
import { CLOTH_COLORS } from './palette'
import { shade } from '../utils/color'

/*
 * Roupas — geometria de referência (viewBox 420x680):
 *  ombros y≈256 · cintura y≈346 (x 168–252) · quadril y≈392 (x 148–272)
 *  braços: externos x≈136/284, pulsos (146,398)/(274,398)
 *  pernas: centros x=186/234, tornozelos y≈596
 */

// ---------- formas base reutilizadas ----------

/** Tronco de blusa/corpete: ombros até `hem`. */
function bodice(hem: number): string {
  return `M 150 268 C 150 258 162 252 176 252 L 244 252 C 258 252 270 258 270 268
          C 270 300 264 324 257 346 L 261 ${hem} L 159 ${hem} L 163 346
          C 156 324 150 300 150 268 Z`
}

/** Manga curta (cap sleeve) esquerda/direita. */
function capSleeves(c: string) {
  const dk = shade(c, -25)
  return (
    <g>
      <path d="M154 266 C138 272 130 292 133 312 L 159 306 C 155 292 153 278 154 266 Z" fill={dk} />
      <path d="M266 266 C282 272 290 292 287 312 L 261 306 C 265 292 267 278 266 266 Z" fill={dk} />
    </g>
  )
}

/** Mangas compridas que acompanham os braços até o pulso. */
function longSleeves(c: string) {
  const dk = shade(c, -25)
  return (
    <g>
      <path d="M156 264 C138 278 130 320 132 354 C133 378 137 394 142 401 C150 410 161 407 161 396 C160 378 158 340 164 304 Z" fill={dk} />
      <path d="M264 264 C282 278 290 320 288 354 C287 378 283 394 278 401 C270 410 259 407 259 396 C260 378 262 340 256 304 Z" fill={dk} />
    </g>
  )
}

/** Coraçãozinho decorativo. */
function heart(x: number, y: number, s: number, fill: string, key?: number) {
  return (
    <path
      key={key}
      d={`M ${x} ${y} c ${-s * 0.5} ${-s * 0.8} ${-s * 1.5} ${-s * 0.2} ${-s * 0.9} ${s * 0.55}
          c ${s * 0.3} ${s * 0.45} ${s * 0.6} ${s * 0.65} ${s * 0.9} ${s * 0.9}
          c ${s * 0.3} ${-s * 0.25} ${s * 0.6} ${-s * 0.45} ${s * 0.9} ${-s * 0.9}
          c ${s * 0.6} ${-s * 0.75} ${-s * 0.4} ${-s * 1.35} ${-s * 0.9} ${-s * 0.55} Z`}
      fill={fill}
    />
  )
}

/** Estrelinha decorativa. */
function star(x: number, y: number, s: number, fill: string, key?: number) {
  return (
    <path
      key={key}
      d={`M ${x} ${y - s} L ${x + s * 0.32} ${y - s * 0.32} L ${x + s} ${y} L ${x + s * 0.32} ${y + s * 0.32}
          L ${x} ${y + s} L ${x - s * 0.32} ${y + s * 0.32} L ${x - s} ${y} L ${x - s * 0.32} ${y - s * 0.32} Z`}
      fill={fill}
    />
  )
}

// ---------- fábricas de itens ----------

function dress(id: string, name: string, colors: string[], body: (c: string) => React.ReactNode): Item {
  return {
    id, name, category: 'roupas', sub: 'Vestidos', slot: 'dress', colors,
    render: ({ color }) => body(color),
    thumbBox: [90, 230, 240, 330],
  }
}

function top(id: string, name: string, colors: string[], body: (c: string) => React.ReactNode): Item {
  return {
    id, name, category: 'roupas', sub: 'Blusas & Casacos', slot: 'top', colors,
    render: ({ color }) => body(color),
    thumbBox: [110, 235, 200, 190],
  }
}

function bottom(id: string, name: string, colors: string[], body: (c: string) => React.ReactNode): Item {
  return {
    id, name, category: 'roupas', sub: 'Saias & Calças', slot: 'bottom', colors,
    render: ({ color }) => body(color),
    thumbBox: [110, 330, 200, 280],
  }
}

// ---------- VESTIDOS (12) ----------

const DRESSES: Item[] = [
  dress('vestido-princesa', 'Princesa Brilhante', ['#F48FB1', '#CE93D8', '#90CAF9', '#FFF59D'], (c) => {
    const dk = shade(c, -30)
    const hi = shade(c, 40)
    return (
      <g>
        <path d={`${bodice(340)}`} fill={c} />
        {capSleeves(c)}
        <path
          d="M163 340 L257 340 C 274 400 296 470 310 528 Q 210 560 110 528 C 124 470 146 400 163 340 Z"
          fill={c}
        />
        {/* barrado e brilho */}
        <path d="M110 528 Q 210 560 310 528 L 306 512 Q 210 544 114 512 Z" fill={hi} opacity="0.8" />
        <path d="M200 252 L220 252 L216 268 L204 268 Z" fill={hi} />
        <path d="M163 340 L257 340 L 253 352 L 167 352 Z" fill={dk} opacity="0.5" />
        {star(165, 420, 7, '#FFFFFF', 1)}
        {star(255, 440, 8, '#FFFFFF', 2)}
        {star(205, 480, 6, '#FFFFFF', 3)}
        {star(140, 480, 6, '#FFFFFF', 4)}
        {star(280, 490, 6, '#FFFFFF', 5)}
      </g>
    )
  }),

  dress('vestido-festa', 'Festa com Babados', ['#CE93D8', '#F48FB1', '#90CAF9'], (c) => {
    const dk = shade(c, -28)
    return (
      <g>
        <path d={bodice(338)} fill={c} />
        {capSleeves(c)}
        <path d="M165 338 L255 338 C 262 366 268 392 274 414 Q 210 436 146 414 C 152 392 158 366 165 338 Z" fill={dk} />
        <path d="M150 408 C 158 436 164 458 170 476 Q 210 494 250 476 C 256 458 262 436 270 408 Q 210 432 150 408 Z" fill={c} />
        <path d="M158 468 C 164 492 172 512 180 526 Q 210 538 240 526 C 248 512 256 492 262 468 Q 210 490 158 468 Z" fill={dk} />
        <circle cx="210" cy="300" r="7" fill="#FFF59D" />
      </g>
    )
  }),

  dress('vestido-tubinho', 'Tubinho Chique', ['#37474F', '#EF9A9A', '#FFFFFF', '#CE93D8'], (c) => {
    const hi = shade(c, 45)
    return (
      <g>
        <path d={bodice(346)} fill={c} />
        <path d="M163 346 L257 346 L 264 452 Q 210 466 156 452 Z" fill={c} />
        <path d="M156 452 Q 210 466 264 452 L 262 442 Q 210 456 158 442 Z" fill={hi} opacity="0.7" />
        <path d="M176 252 L 244 252 L 238 264 L 182 264 Z" fill={hi} opacity="0.5" />
      </g>
    )
  }),

  dress('vestido-bolinhas', 'Rodado de Bolinhas', ['#F48FB1', '#90CAF9', '#FFF59D', '#A5D6A7'], (c) => (
    <g>
      <path d={bodice(340)} fill={c} />
      {capSleeves(c)}
      <path d="M163 340 L257 340 C 270 388 282 432 290 466 Q 210 490 130 466 C 138 432 150 388 163 340 Z" fill={c} />
      {[
        [180, 380], [240, 372], [210, 412], [160, 430], [262, 428], [196, 452], [236, 452], [148, 392],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7" fill="#FFFFFF" opacity="0.9" />
      ))}
      <circle cx="210" cy="290" r="6" fill="#FFFFFF" opacity="0.9" />
    </g>
  )),

  dress('vestido-coracoes', 'Rodado de Corações', ['#EF9A9A', '#F48FB1', '#FFFFFF'], (c) => {
    const deco = shade(c, -60)
    return (
      <g>
        <path d={bodice(340)} fill={c} />
        {capSleeves(c)}
        <path d="M163 340 L257 340 C 270 388 282 432 290 466 Q 210 490 130 466 C 138 432 150 388 163 340 Z" fill={c} />
        {[
          [180, 385], [244, 380], [210, 425], [158, 435], [262, 432],
        ].map(([x, y], i) => heart(x, y, 8, deco, i))}
        {heart(210, 295, 7, deco, 99)}
      </g>
    )
  }),

  dress('vestido-estrelado', 'Céu Estrelado', ['#7986CB', '#37474F', '#CE93D8'], (c) => (
    <g>
      <path d={bodice(340)} fill={c} />
      {longSleeves(c)}
      <path d="M163 340 L257 340 C 272 396 284 442 292 478 Q 210 502 128 478 C 136 442 148 396 163 340 Z" fill={c} />
      {[
        [175, 380, 6], [245, 372, 7], [210, 415, 5], [158, 440, 7], [264, 438, 6], [206, 460, 7], [232, 300, 4], [186, 290, 4],
      ].map(([x, y, s], i) => star(x, y, s, '#FFF59D', i))}
    </g>
  )),

  dress('vestido-listrado', 'Listradinho Doce', ['#90CAF9', '#F48FB1', '#A5D6A7'], (c) => {
    const dk = shade(c, -30)
    return (
      <g>
        <path d={bodice(340)} fill={c} />
        {capSleeves(c)}
        <path d="M163 340 L257 340 C 268 384 278 424 286 458 Q 210 480 134 458 C 142 424 152 384 163 340 Z" fill={c} />
        <g fill={dk} opacity="0.55">
          <path d="M158 362 L262 362 L265 374 L155 374 Z" />
          <path d="M150 396 L270 396 L273 408 L147 408 Z" />
          <path d="M142 430 L278 430 L281 442 L139 442 Z" />
        </g>
      </g>
    )
  }),

  dress('vestido-casual', 'Casual do Dia', ['#A5D6A7', '#FFAB91', '#90CAF9', '#FFF59D'], (c) => (
    <g>
      <path d={bodice(340)} fill={c} />
      {capSleeves(c)}
      <path d="M163 340 L257 340 C 266 380 274 416 280 446 Q 210 466 140 446 C 146 416 154 380 163 340 Z" fill={c} />
      <path d="M140 446 Q 210 466 280 446 L 277 434 Q 210 454 143 434 Z" fill={shade(c, -25)} />
    </g>
  )),

  dress('vestido-cinto', 'Lacinho na Cintura', ['#FFAB91', '#F48FB1', '#CE93D8'], (c) => {
    const belt = shade(c, -55)
    return (
      <g>
        <path d={bodice(340)} fill={c} />
        {capSleeves(c)}
        <path d="M163 340 L257 340 C 270 390 280 432 288 464 Q 210 486 132 464 C 140 432 150 390 163 340 Z" fill={c} />
        <path d="M162 336 L258 336 L256 352 L164 352 Z" fill={belt} />
        {/* lacinho */}
        <path d="M210 344 L194 333 L196 355 Z" fill={belt} />
        <path d="M210 344 L226 333 L224 355 Z" fill={belt} />
        <circle cx="210" cy="344" r="5" fill={shade(belt, 40)} />
      </g>
    )
  }),

  dress('vestido-tomara', 'Tomara-que-caia', ['#F9A8D4', '#90CAF9', '#FFF59D'], (c) => {
    const hi = shade(c, 40)
    return (
      <g>
        <path d="M162 282 Q 210 296 258 282 L 257 346 L 261 360 L 159 360 L 163 346 Z" fill={c} />
        <path d="M162 282 Q 210 296 258 282 L 256 294 Q 210 308 164 294 Z" fill={hi} opacity="0.8" />
        <path d="M161 358 L259 358 C 270 400 280 436 286 462 Q 210 484 134 462 C 140 436 150 400 161 358 Z" fill={c} />
        <path d="M134 462 Q 210 484 286 462 L 283 450 Q 210 472 137 450 Z" fill={hi} opacity="0.8" />
      </g>
    )
  }),

  dress('vestido-boneca', 'Gola Boneca', ['#90CAF9', '#F48FB1', '#FFFFFF'], (c) => (
    <g>
      <path d={bodice(340)} fill={c} />
      {capSleeves(c)}
      <path d="M163 340 L257 340 C 268 386 278 426 284 454 Q 210 476 136 454 C 142 426 152 386 163 340 Z" fill={c} />
      {/* gola peter pan */}
      <path d="M178 252 Q 194 274 210 256 Q 226 274 242 252 Q 226 250 210 252 Q 194 250 178 252 Z" fill="#FFFFFF" />
      <circle cx="210" cy="266" r="4" fill={shade(c, -40)} />
    </g>
  )),

  dress('vestido-arcoiris', 'Arco-íris Mágico', ['#FFFFFF'], (c) => (
    <g>
      <path d={bodice(340)} fill={c} />
      {capSleeves(c)}
      <path d="M163 340 L257 340 C 270 390 282 434 290 468 Q 210 492 130 468 C 138 434 150 390 163 340 Z" fill={c} />
      <g opacity="0.9">
        <path d="M158 364 L262 364 L266 384 L154 384 Z" fill="#F48FB1" />
        <path d="M152 392 L268 392 L272 412 L148 412 Z" fill="#FFF59D" />
        <path d="M145 420 L275 420 L279 440 L141 440 Z" fill="#A5D6A7" />
        <path d="M138 448 L282 448 L286 466 Q 210 488 134 466 Z" fill="#90CAF9" />
      </g>
      {heart(210, 296, 8, '#F48FB1', 1)}
    </g>
  )),
]

// ---------- BLUSAS & CASACOS (9) ----------

const TOPS: Item[] = [
  top('camiseta', 'Camiseta Básica', CLOTH_COLORS, (c) => (
    <g>
      <path d={bodice(368)} fill={c} />
      {capSleeves(c)}
      <path d="M159 368 L261 368 L260 360 L160 360 Z" fill={shade(c, -25)} />
    </g>
  )),

  top('camiseta-coracao', 'Camiseta Coração', ['#FFFFFF', '#F48FB1', '#FFF59D'], (c) => (
    <g>
      <path d={bodice(368)} fill={c} />
      {capSleeves(c)}
      {heart(210, 300, 14, '#EC4899', 1)}
    </g>
  )),

  top('blusa-babado', 'Blusa com Babado', ['#F9A8D4', '#CE93D8', '#FFFFFF'], (c) => (
    <g>
      <path d={bodice(360)} fill={c} />
      {capSleeves(c)}
      <path d="M158 358 Q 172 374 186 358 Q 198 374 210 358 Q 222 374 234 358 Q 248 374 262 358 L 261 350 L 159 350 Z" fill={shade(c, -22)} />
      <circle cx="210" cy="276" r="4" fill={shade(c, -45)} />
      <circle cx="210" cy="296" r="4" fill={shade(c, -45)} />
    </g>
  )),

  top('cropped-estrela', 'Cropped Estrela', ['#FFF59D', '#F48FB1', '#90CAF9'], (c) => (
    <g>
      <path d={bodice(326)} fill={c} />
      {capSleeves(c)}
      {star(210, 294, 13, shade(c, -70), 1)}
    </g>
  )),

  top('regatinha', 'Regatinha', ['#A5D6A7', '#F48FB1', '#FFFFFF', '#90CAF9'], (c) => (
    <g>
      <path d="M168 254 L 180 254 L 182 270 L 238 270 L 240 254 L 252 254 C 262 254 268 260 268 270 C 268 300 263 324 257 346 L 261 364 L 159 364 L 163 346 C 157 324 152 300 152 270 C 152 260 158 254 168 254 Z" fill={c} />
      <path d="M159 364 L261 364 L260 356 L160 356 Z" fill={shade(c, -25)} />
    </g>
  )),

  top('sueter', 'Suéter Quentinho', ['#FFAB91', '#CE93D8', '#A5D6A7'], (c) => (
    <g>
      {longSleeves(c)}
      <path d={bodice(372)} fill={c} />
      <path d="M159 372 L261 372 L260 360 L160 360 Z" fill={shade(c, -30)} />
      <path d="M176 252 L244 252 L242 262 L178 262 Z" fill={shade(c, -30)} />
      <path d="M196 280 Q210 290 224 280" stroke={shade(c, -30)} strokeWidth="4" fill="none" />
      <path d="M192 304 Q210 316 228 304" stroke={shade(c, -30)} strokeWidth="4" fill="none" />
    </g>
  )),

  top('jaqueta-jeans', 'Jaqueta Jeans', ['#7EA6D9', '#5C84B8', '#37474F'], (c) => {
    const dk = shade(c, -35)
    return (
      <g>
        {longSleeves(c)}
        <path d={bodice(362)} fill={c} />
        <path d="M204 252 L216 252 L216 362 L204 362 Z" fill="#FFFFFF" opacity="0.85" />
        <path d="M159 362 L261 362 L260 350 L160 350 Z" fill={dk} />
        <path d="M168 252 L196 252 L192 276 L172 276 Z" fill={dk} opacity="0.4" />
        <path d="M252 252 L224 252 L228 276 L248 276 Z" fill={dk} opacity="0.4" />
        <circle cx="210" cy="290" r="3.4" fill={dk} />
        <circle cx="210" cy="320" r="3.4" fill={dk} />
      </g>
    )
  }),

  top('cardiga', 'Casaquinho de Lã', ['#CE93D8', '#F9A8D4', '#FFF59D'], (c) => (
    <g>
      {longSleeves(c)}
      <path d={bodice(370)} fill={c} />
      <path d="M210 252 L210 370" stroke={shade(c, -30)} strokeWidth="4" />
      <circle cx="200" cy="288" r="3.4" fill={shade(c, -45)} />
      <circle cx="200" cy="316" r="3.4" fill={shade(c, -45)} />
      <path d="M176 252 Q 210 270 244 252 L 244 262 Q 210 280 176 262 Z" fill={shade(c, -22)} />
    </g>
  )),

  top('jaqueta-moto', 'Jaqueta Estilosa', ['#37474F', '#7E57C2', '#EF9A9A'], (c) => {
    const hi = shade(c, 50)
    return (
      <g>
        {longSleeves(c)}
        <path d={bodice(360)} fill={c} />
        <path d="M200 252 L228 360 L 218 360 L 192 252 Z" fill={hi} opacity="0.7" />
        <path d="M176 252 L 196 268 L 176 270 Z" fill={hi} opacity="0.5" />
        <path d="M244 252 L 224 268 L 244 270 Z" fill={hi} opacity="0.5" />
        <circle cx="222" cy="340" r="3" fill={hi} />
        <circle cx="214" cy="310" r="3" fill={hi} />
        <circle cx="206" cy="280" r="3" fill={hi} />
      </g>
    )
  }),
]

// ---------- SAIAS, SHORTS & CALÇAS (9) ----------

const BOTTOMS: Item[] = [
  bottom('saia-rodada', 'Saia Rodada', CLOTH_COLORS, (c) => (
    <g>
      <path d="M162 344 L258 344 C 268 384 278 420 284 448 Q 210 470 136 448 C 142 420 152 384 162 344 Z" fill={c} />
      <path d="M136 448 Q 210 470 284 448 L 281 436 Q 210 458 139 436 Z" fill={shade(c, -25)} />
    </g>
  )),

  bottom('saia-babados', 'Saia de Babados', ['#F9A8D4', '#90CAF9', '#FFF59D'], (c) => {
    const dk = shade(c, -25)
    return (
      <g>
        <path d="M162 344 L258 344 C 263 366 268 386 272 402 Q 210 420 148 402 C 152 386 157 366 162 344 Z" fill={c} />
        <path d="M152 396 C 158 420 164 440 170 454 Q 210 470 250 454 C 256 440 262 420 268 396 Q 210 416 152 396 Z" fill={dk} />
      </g>
    )
  }),

  bottom('saia-lapis', 'Saia Lápis', ['#37474F', '#EF9A9A', '#CE93D8'], (c) => (
    <g>
      <path d="M160 344 L260 344 L 266 446 Q 210 458 154 446 Z" fill={c} />
      <path d="M154 446 Q 210 458 266 446 L 264 436 Q 210 448 156 436 Z" fill={shade(c, 40)} opacity="0.6" />
    </g>
  )),

  bottom('saia-tutu', 'Saia Tutu', ['#F9A8D4', '#CE93D8', '#FFFFFF'], (c) => {
    const lt = shade(c, 30)
    return (
      <g>
        <path d="M160 344 L260 344 C 276 376 290 408 298 430 Q 210 456 122 430 C 130 408 144 376 160 344 Z" fill={lt} opacity="0.8" />
        <path d="M165 344 L255 344 C 268 372 278 398 284 416 Q 210 440 136 416 C 142 398 152 372 165 344 Z" fill={c} opacity="0.9" />
        <path d="M160 340 L260 340 L259 354 L161 354 Z" fill={shade(c, -30)} />
      </g>
    )
  }),

  bottom('saia-jeans', 'Saia Jeans', ['#7EA6D9', '#5C84B8'], (c) => {
    const dk = shade(c, -35)
    return (
      <g>
        <path d="M160 344 L260 344 L 266 424 Q 210 436 154 424 Z" fill={c} />
        <path d="M160 344 L260 344 L259 356 L161 356 Z" fill={dk} opacity="0.6" />
        <path d="M210 356 L210 430" stroke={dk} strokeWidth="3" opacity="0.6" />
        <path d="M168 362 L186 362 L184 380 L170 380 Z" fill="none" stroke={dk} strokeWidth="2" opacity="0.6" />
      </g>
    )
  }),

  bottom('shortinho', 'Shortinho', ['#F48FB1', '#A5D6A7', '#FFF59D', '#90CAF9'], (c) => (
    <g>
      <path d="M158 344 L262 344 L 268 416 L 220 420 L 210 384 L 200 420 L 152 416 Z" fill={c} />
      <path d="M152 416 L 200 420 L 199 410 L 154 406 Z" fill={shade(c, -25)} />
      <path d="M268 416 L 220 420 L 221 410 L 266 406 Z" fill={shade(c, -25)} />
      <path d="M158 344 L262 344 L261 356 L159 356 Z" fill={shade(c, -25)} />
    </g>
  )),

  bottom('short-jeans', 'Short Jeans', ['#7EA6D9', '#37474F'], (c) => {
    const dk = shade(c, -35)
    return (
      <g>
        <path d="M158 344 L262 344 L 267 408 L 221 412 L 210 380 L 199 412 L 153 408 Z" fill={c} />
        <path d="M158 344 L262 344 L261 356 L159 356 Z" fill={dk} opacity="0.6" />
        <path d="M153 408 L 199 412 L 198 402 L 155 398 Z" fill="#FFFFFF" opacity="0.7" />
        <path d="M267 408 L 221 412 L 222 402 L 265 398 Z" fill="#FFFFFF" opacity="0.7" />
        <circle cx="210" cy="352" r="3" fill={dk} />
      </g>
    )
  }),

  bottom('calca-jeans', 'Calça Jeans', ['#7EA6D9', '#5C84B8', '#37474F'], (c) => {
    const dk = shade(c, -35)
    return (
      <g>
        <path d="M160 344 L260 344 C 262 430 256 520 250 588 L 220 588 L 214 420 L 206 420 L 200 588 L 170 588 C 164 520 158 430 160 344 Z" fill={c} />
        <path d="M160 344 L260 344 L259 358 L161 358 Z" fill={dk} opacity="0.6" />
        <path d="M170 366 L188 366 L186 384 L172 384 Z" fill="none" stroke={dk} strokeWidth="2" opacity="0.6" />
        <path d="M250 366 L232 366 L234 384 L248 384 Z" fill="none" stroke={dk} strokeWidth="2" opacity="0.6" />
        <path d="M170 588 L200 588 L200 578 L171 578 Z" fill={dk} opacity="0.5" />
        <path d="M250 588 L220 588 L220 578 L249 578 Z" fill={dk} opacity="0.5" />
      </g>
    )
  }),

  bottom('legging', 'Legging', ['#37474F', '#CE93D8', '#F48FB1'], (c) => (
    <g>
      <path d="M162 344 L258 344 C 259 430 252 520 246 592 L 222 592 L 214 420 L 206 420 L 198 592 L 174 592 C 168 520 161 430 162 344 Z" fill={c} />
      <path d="M162 344 L258 344 L257 356 L163 356 Z" fill={shade(c, 40)} opacity="0.5" />
    </g>
  )),
]

export const CLOTHES_ITEMS: Item[] = [...DRESSES, ...TOPS, ...BOTTOMS]
