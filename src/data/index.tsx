import type { Category, CharacterLook, Item, Slot } from '../types'
import { SKIN_TONES } from './palette'
import { HAIR_ITEMS } from './hair'
import { FACE_ITEMS } from './faces'
import { MAKEUP_ITEMS } from './makeup'
import { CLOTHES_ITEMS } from './clothes'
import { SHOES_ITEMS } from './shoes'
import { ACC_ITEMS } from './accessories'

/** Itens de pele: o render é vazio — a cor é aplicada direto no corpo. */
const SKIN_ITEMS: Item[] = SKIN_TONES.map((tone) => ({
  id: tone.id,
  name: tone.name,
  category: 'pele',
  sub: 'Tom de pele',
  slot: 'skin',
  colors: [tone.color],
  render: () => null,
}))

/** Catálogo completo do jogo. */
export const CATALOG: Item[] = [
  ...SKIN_ITEMS,
  ...HAIR_ITEMS,
  ...FACE_ITEMS,
  ...MAKEUP_ITEMS,
  ...CLOTHES_ITEMS,
  ...SHOES_ITEMS,
  ...ACC_ITEMS,
]

const BY_ID = new Map(CATALOG.map((i) => [i.id, i]))

export function getItem(id: string): Item | undefined {
  return BY_ID.get(id)
}

/** Metadados das categorias (abas do guarda-roupa). */
export const CATEGORIES: { id: Category; name: string; icon: string }[] = [
  { id: 'roupas', name: 'Roupas', icon: '👗' },
  { id: 'cabelo', name: 'Cabelo', icon: '💇‍♀️' },
  { id: 'sapatos', name: 'Sapatos', icon: '👠' },
  { id: 'acessorios', name: 'Acessórios', icon: '💎' },
  { id: 'maquiagem', name: 'Maquiagem', icon: '💄' },
  { id: 'rosto', name: 'Rosto', icon: '👀' },
  { id: 'pele', name: 'Pele', icon: '🎨' },
]

/** Subcategorias (chips) de uma categoria, na ordem do catálogo. */
export function subsOf(category: Category): string[] {
  const subs: string[] = []
  for (const item of CATALOG) {
    if (item.category === category && !subs.includes(item.sub)) subs.push(item.sub)
  }
  return subs
}

export function itemsOf(category: Category, sub: string): Item[] {
  return CATALOG.filter((i) => i.category === category && i.sub === sub)
}

/** Slots que podem ficar vazios (toque de novo para remover). */
export const REMOVABLE_SLOTS: Slot[] = [
  'lipstick', 'blush', 'eyeshadow', 'eyeliner',
  'dress', 'top', 'bottom', 'shoes',
  'earrings', 'necklace', 'bracelet', 'headwear', 'glasses',
]

/** Visual inicial da personagem. */
export const DEFAULT_LOOK: CharacterLook = {
  skin: { itemId: 'pele-clara', color: '#FFD9BC' },
  hair: { itemId: 'cabelo-longo-liso-a', color: '#5C3A21' },
  eyes: { itemId: 'olhos-redondos', color: '#5C3A21' },
  brows: { itemId: 'sobrancelha-arco', color: '#5C4033' },
  nose: { itemId: 'nariz-botao', color: '#000000' },
  mouth: { itemId: 'boca-sorriso', color: '#000000' },
  top: { itemId: 'camiseta', color: '#F48FB1' },
  bottom: { itemId: 'saia-rodada', color: '#CE93D8' },
  shoes: { itemId: 'sapatilha-laco', color: '#F9A8D4' },
}

/** Sorteia um item (e cor) de uma lista. */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Gera um visual aleatório completo — o botão "Surpresa!". */
export function randomLook(): CharacterLook {
  const look: CharacterLook = {}
  const equipRandom = (slot: Slot, pool: Item[], chance = 1) => {
    if (Math.random() > chance) return
    const item = pick(pool.filter((i) => i.slot === slot))
    if (!item) return
    look[slot] = { itemId: item.id, color: item.colors ? pick(item.colors) : '#000000' }
  }

  equipRandom('skin', SKIN_ITEMS)
  equipRandom('hair', HAIR_ITEMS)
  equipRandom('eyes', FACE_ITEMS)
  equipRandom('brows', FACE_ITEMS)
  equipRandom('nose', FACE_ITEMS)
  equipRandom('mouth', FACE_ITEMS)

  // vestido OU conjunto blusa + saia/calça
  if (Math.random() < 0.5) {
    equipRandom('dress', CLOTHES_ITEMS)
  } else {
    equipRandom('top', CLOTHES_ITEMS)
    equipRandom('bottom', CLOTHES_ITEMS)
  }
  equipRandom('shoes', SHOES_ITEMS)

  equipRandom('lipstick', MAKEUP_ITEMS, 0.6)
  equipRandom('blush', MAKEUP_ITEMS, 0.5)
  equipRandom('eyeshadow', MAKEUP_ITEMS, 0.4)
  equipRandom('earrings', ACC_ITEMS, 0.55)
  equipRandom('necklace', ACC_ITEMS, 0.45)
  equipRandom('bracelet', ACC_ITEMS, 0.35)
  equipRandom('headwear', ACC_ITEMS, 0.45)
  equipRandom('glasses', ACC_ITEMS, 0.2)

  return look
}
