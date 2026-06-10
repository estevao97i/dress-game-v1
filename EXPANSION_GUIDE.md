# 🌱 Guia de Expansões — Ateliê Encantado

A arquitetura foi pensada para crescer sem dor. Quase tudo se resume a
**adicionar objetos `Item` ao catálogo** — a UI, o drag & drop, o salvamento e
o seletor de cores se adaptam sozinhos.

---

## 1. Adicionar uma nova roupa / cabelo / acessório

Abra o arquivo da categoria em `src/data/` (ex.: `clothes.tsx`) e adicione um
`Item`:

```tsx
dress('vestido-sereia', 'Vestido Sereia', ['#90CAF9', '#A5D6A7'], (c) => (
  <g>
    <path d={bodice(340)} fill={c} />
    {/* ...desenhe o resto da peça em SVG... */}
  </g>
))
```

Regras de ouro:

- O desenho usa o **viewBox `0 0 420 680`**. Veja os pontos de referência do
  corpo no topo de `Body.tsx` (ombros, cintura, pés, olhos…).
- Use `shade(cor, n)` (de `utils/color.ts`) para sombras/brilhos automáticos —
  assim a peça funciona em qualquer cor.
- `colors: [...]` define as cores disponíveis (a 1ª é a padrão). Omita para um
  item de cor única.
- `thumbBox: [x, y, w, h]` enquadra a miniatura no cartão.
- Pronto: o item aparece automaticamente na aba/subcategoria certa.

### Cabelo com camada de trás

Cabelos podem ter `renderBack` (desenhado **atrás** do corpo). Veja
`backLong`, `backCurly`, etc. em `hair.tsx`.

---

## 2. Criar uma nova subcategoria

Basta usar um novo valor em `sub` num `Item`. Ex.: para criar "Macacões" em
Roupas, crie itens com `sub: 'Macacões'`. O chip aparece sozinho (a ordem
segue a ordem do catálogo).

---

## 3. Criar uma categoria totalmente nova (ex.: "Asas", "Fundo")

1. Adicione o id em `Category` e, se precisar, um `Slot` novo em `types.ts`.
2. Crie `src/data/minhacategoria.tsx` exportando os itens.
3. Importe e espalhe em `CATALOG` (em `data/index.tsx`).
4. Adicione a entrada em `CATEGORIES` (id, nome, ícone emoji).
5. Se o slot deve renderizar numa ordem específica, inclua-o em
   `LAYERS_OVER_BODY` (em `Character.tsx`).
6. Se o item pode ser removido com um segundo toque, adicione o slot a
   `REMOVABLE_SLOTS` (em `data/index.tsx`).

---

## 4. Ideias de novas features

| Feature | Onde mexer | Dificuldade |
|--------|-----------|-------------|
| **Cenários de fundo** | nova categoria `fundo` desenhada atrás de tudo no `Character` | Baixa |
| **Mais poses / corpo** | parametrizar `Body.tsx` (ex.: braços levantados) | Média |
| **Sistema de moedas/loja** | flag `locked` no `Item` + saldo na store; cadeado no `ItemCard` | Média |
| **Vários slots salvos** | trocar `look` por `looks[]` na store + UI de "armário" | Média |
| **Compartilhar look por link** | serializar `look` em base64 na URL | Baixa |
| **Mini-game de combinar look** | nova tela + pontuação | Alta |
| **Trocar sons sintetizados por arquivos** | substituir `audio/sounds.ts` por `<audio>`/Howler | Baixa |
| **Animação de "trocar de roupa"** | variants Framer Motion no `Character` por slot | Média |

---

## 5. Boas práticas ao expandir

- **Mantenha tudo vetorial**: SVG escala sem perder qualidade e é colorível.
- **Reaproveite os helpers** (`bodice`, `capSleeves`, `heart`, `star`…) para
  manter coerência visual.
- **Teste em mobile e desktop**: o `WardrobePanel` troca de layout em `1024px`.
- **IDs únicos e estáveis**: o save usa `itemId`. Não renomeie ids de itens já
  publicados (quebraria o look salvo dos jogadores) — adicione novos.
- **Performance**: cada item é uma função pura de SVG; evite estado interno
  pesado. O catálogo é indexado por id em `data/index.tsx`.

---

## 6. Checklist para publicação (App Store / Play / Web)

- [ ] Empacotar com Capacitor/Tauri (mobile) ou hospedar o `dist/` (web).
- [ ] Ícones e splash screen.
- [ ] PWA (manifest + service worker) para jogar offline.
- [ ] Política de privacidade (público infantil — atenção a COPPA/LGPD: o jogo
      hoje **não coleta dados**, só usa localStorage local).
- [ ] Telas em mais idiomas (i18n).

Boas customizações! 💖
