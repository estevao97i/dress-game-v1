import type { ReactNode } from 'react'

/** Categorias principais do guarda-roupa (abas). */
export type Category =
  | 'pele'
  | 'cabelo'
  | 'rosto'
  | 'maquiagem'
  | 'roupas'
  | 'sapatos'
  | 'acessorios'

/**
 * Slot = onde o item "encaixa" na personagem.
 * Itens do mesmo slot se substituem; slots diferentes convivem.
 */
export type Slot =
  | 'skin'
  | 'hair'
  | 'eyes'
  | 'brows'
  | 'nose'
  | 'mouth'
  | 'lipstick'
  | 'blush'
  | 'eyeshadow'
  | 'eyeliner'
  | 'dress'
  | 'top'
  | 'bottom'
  | 'shoes'
  | 'earrings'
  | 'necklace'
  | 'bracelet'
  | 'headwear'
  | 'glasses'

/** Contexto passado para a função de desenho de cada item. */
export interface RenderCtx {
  /** Cor escolhida para o item (quando o item aceita cores). */
  color: string
  /** Tom de pele atual — usado por itens que precisam combinar (ex.: decote). */
  skin: string
}

/** Um item do catálogo (peça de roupa, cabelo, maquiagem...). */
export interface Item {
  id: string
  name: string
  category: Category
  /** Subcategoria exibida como chip (ex.: "Vestidos", "Saias"). */
  sub: string
  slot: Slot
  /** Cores disponíveis; a primeira é a padrão. */
  colors?: string[]
  /** Camada(s) SVG desenhadas sobre a personagem. */
  render: (ctx: RenderCtx) => ReactNode
  /** Camada desenhada ATRÁS do corpo (ex.: parte de trás do cabelo). */
  renderBack?: (ctx: RenderCtx) => ReactNode
  /** Miniatura própria (se não houver, o render é reaproveitado no card). */
  thumb?: (ctx: RenderCtx) => ReactNode
  /** Ajuste de zoom da miniatura: [x, y, largura, altura] do viewBox. */
  thumbBox?: [number, number, number, number]
}

/** Item equipado: referência ao catálogo + cor escolhida. */
export interface Equipped {
  itemId: string
  color: string
}

/** Estado completo do visual da personagem (o que é salvo). */
export type CharacterLook = Partial<Record<Slot, Equipped>>
