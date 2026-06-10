import { shade } from '../../utils/color'

/**
 * Corpo base da personagem (pele): cabeça, orelhas, pescoço,
 * tronco, braços e pernas. Tudo desenhado no viewBox 0 0 420 680.
 *
 * Pontos de referência usados pelos itens do catálogo:
 *  - Cabeça: topo y=56, laterais x=124/296, queixo y=238
 *  - Olhos:  (178,150) e (242,150)
 *  - Orelhas/brincos: (120,168) e (300,168)
 *  - Pescoço: x 196–224, y 230–262
 *  - Ombros: y≈262, tronco até o quadril y≈392
 *  - Pulsos/mãos: (146,398) e (274,398)
 *  - Pernas: centros x=186 e x=234, tornozelos y≈592
 *  - Pés: y 592–616
 */
export function Body({ skin }: { skin: string }) {
  const dark = shade(skin, -28)

  return (
    <g id="body-skin">
      {/* pernas */}
      <path d={legPath(186)} fill={skin} />
      <path d={legPath(234)} fill={skin} />
      {/* pés (descalços) */}
      <path d="M172 592 Q168 612 180 614 L196 614 Q200 604 197 592 Z" fill={skin} />
      <path d="M248 592 Q252 612 240 614 L224 614 Q220 604 223 592 Z" fill={skin} />

      {/* braços */}
      <path
        d="M156 268 C140 280 134 320 136 352 C137 376 140 392 144 398 C150 406 158 404 158 394 C158 378 156 340 162 306 Z"
        fill={skin}
      />
      <path
        d="M264 268 C280 280 286 320 284 352 C283 376 280 392 276 398 C270 406 262 404 262 394 C262 378 264 340 258 306 Z"
        fill={skin}
      />
      {/* mãos */}
      <circle cx="149" cy="400" r="10" fill={skin} />
      <circle cx="271" cy="400" r="10" fill={skin} />

      {/* tronco (respira suavemente) */}
      <g className="anim-breathe">
        <path
          d="M152 274 C152 262 164 256 178 256 L242 256 C256 256 268 262 268 274 C268 302 263 324 256 346 C269 360 272 378 272 392 L148 392 C148 378 151 360 164 346 C157 324 152 302 152 274 Z"
          fill={skin}
        />
      </g>

      {/* pescoço com sombrinha do queixo */}
      <path d="M196 224 L224 224 L224 264 L196 264 Z" fill={skin} />
      <path d="M196 224 L224 224 L224 238 Q210 246 196 238 Z" fill={dark} opacity="0.35" />

      {/* orelhas */}
      <ellipse cx="122" cy="160" rx="11" ry="15" fill={skin} />
      <ellipse cx="298" cy="160" rx="11" ry="15" fill={skin} />

      {/* cabeça */}
      <path
        d="M124 140 C124 86 162 54 210 54 C258 54 296 86 296 140 C296 198 262 240 210 240 C158 240 124 198 124 140 Z"
        fill={skin}
      />
    </g>
  )
}

/** Perna afilada com centro em `cx`. */
function legPath(cx: number): string {
  const top = 386
  const bottom = 596
  const wTop = 17
  const wBottom = 11
  return `M ${cx - wTop} ${top}
          C ${cx - wTop} ${top + 80} ${cx - wBottom - 2} ${bottom - 60} ${cx - wBottom} ${bottom}
          L ${cx + wBottom} ${bottom}
          C ${cx + wBottom + 2} ${bottom - 60} ${cx + wTop} ${top + 80} ${cx + wTop} ${top}
          Z`
}
