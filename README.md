# ✨ Ateliê Encantado — Jogo de Vestir

Jogo casual de vestir e customizar personagem, inspirado nos clássicos jogos
de menina dos anos 2000 (Barbie Dress Up, Stardoll, Sue Games), com estética
pastel kawaii e qualidade visual moderna. Feito para meninas de 8 a 16 anos.

A personagem é **100% desenhada em SVG vetorial** (nada de imagens externas):
escala perfeitamente em qualquer tela e cada peça é colorível dinamicamente.

## 🎮 Funcionalidades

- **Personagem original** em SVG, com rosto fofo, olhos grandes e expressivos.
- **Customização completa**: pele, cabelo, olhos, sobrancelhas, nariz, boca,
  maquiagem, roupas, sapatos e acessórios.
- **Drag & drop**: arraste qualquer item até a personagem para vestir — ou só toque.
- **Múltiplas cores** por item, trocáveis com um toque.
- **Botão Surpresa** 🎲 — gera um look aleatório completo.
- **Animações**: piscar de olhos, respiração, balanço do cabelo, brilhos (✨)
  ao equipar e reações com Framer Motion.
- **Sons fofos** sintetizados (Web Audio API, sem arquivos): clique, hover,
  equipar, remover e "mágica". Podem ser desligados.
- **Salvamento automático** no navegador (localStorage) — o visual persiste.
- **Exportar PNG** 📸 da personagem em alta resolução com fundo pastel.
- **Totalmente responsivo**: celular, tablet e desktop.

## 📱 Responsividade

A interface se reorganiza para sempre **caber nas dimensões da tela**:

| Tela | Layout |
|------|--------|
| **Celular / Tablet** | Palco em cima; guarda-roupa embaixo. Categorias, subcategorias, cores e itens viram **fileiras com scroll horizontal** (autoscroll), criando vários "setores" compactos. |
| **Desktop** | Palco à esquerda; à direita, **trilho vertical** de categorias + **grade** de itens com scroll vertical. |

O ponto de virada é `1024px` (hook `useIsDesktop`). A personagem mantém a
proporção `420×680` em qualquer tamanho via `aspect-ratio`.

## 🛠️ Tecnologias

- **React 19** + **TypeScript**
- **Vite 5** (build)
- **Tailwind CSS 4** (estilo, via `@tailwindcss/vite`)
- **Framer Motion** (animações de UI)
- **Zustand** + `persist` (estado + salvamento)
- **SVG** (todos os assets) e **Web Audio API** (sons)
- **Canvas** (exportação PNG)

## 🚀 Como rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # pré-visualiza o build
```

> Requer Node 20.15+ (as versões das deps foram fixadas para isso).

## 📁 Estrutura de pastas

```
src/
├── App.tsx                     # alterna tela inicial ↔ jogo
├── main.tsx
├── index.css                   # Tailwind + paleta + animações CSS
├── types.ts                    # tipos centrais (Item, Slot, CharacterLook…)
│
├── data/                       # CATÁLOGO DE ASSETS (SVG por código)
│   ├── index.tsx               # junta tudo, categorias, look padrão, random
│   ├── palette.ts              # tons de pele e paletas de cor
│   ├── hair.tsx                # 20 cabelos (10 estilos × 2 cores base)
│   ├── faces.tsx               # olhos, sobrancelhas, narizes e bocas
│   ├── makeup.tsx              # batom, blush, sombra, delineador
│   ├── clothes.tsx             # 30 roupas (vestidos, blusas, saias, calças…)
│   ├── shoes.tsx               # 15 sapatos (tênis, salto, sapatilha…)
│   └── accessories.tsx         # 15 acessórios (brincos, colares, tiaras…)
│
├── store/
│   └── useGameStore.ts         # Zustand: look, equip/unequip, cores, save
│
├── audio/
│   └── sounds.ts               # efeitos sonoros (Web Audio)
│
├── utils/
│   ├── color.ts                # shade() — sombra/brilho automático
│   ├── exportPng.ts            # SVG → Canvas → PNG
│   └── useIsDesktop.ts         # hook de breakpoint responsivo
│
└── components/
    ├── character/
    │   ├── Body.tsx            # corpo base (pele) em SVG
    │   └── Character.tsx       # monta todas as camadas na ordem certa
    ├── effects/
    │   └── Sparkles.tsx        # chuva de brilhos ao equipar
    ├── game/
    │   ├── ItemCard.tsx        # cartão de item + drag & drop
    │   ├── WardrobePanel.tsx   # guarda-roupa responsivo
    │   └── TopBar.tsx          # barra de ações (surpresa, foto, som…)
    └── screens/
        ├── StartScreen.tsx     # tela inicial
        └── GameScreen.tsx      # tela principal (palco + guarda-roupa)
```

## 🧩 Como a personagem é montada

Cada item do catálogo é um objeto `Item` com uma função `render(ctx)` que
devolve nós SVG, desenhados sobre um palco de viewBox `0 0 420 680`. Os itens
encaixam em **slots** (ex.: `dress`, `hair`, `shoes`). O componente
`Character` empilha as camadas na ordem correta — incluindo a camada **de trás**
do cabelo (`renderBack`), que fica atrás do corpo.

Pontos de referência do corpo (para alinhar novos assets) estão documentados
no topo de `Body.tsx`.

## 🎨 Conteúdo incluído

- **5** tons de pele · **20** cabelos · **4** olhos · **4** sobrancelhas ·
  **3** narizes · **5** bocas
- **11** maquiagens (batom, blush, sombra, delineador)
- **30** roupas · **15** sapatos · **15** acessórios

## 🌱 Expansões futuras

Veja **[EXPANSION_GUIDE.md](EXPANSION_GUIDE.md)** para o passo a passo de como
adicionar novos itens, categorias, cenários, sistema de moedas, etc.

---

Feito com 💖 como um estúdio AAA de jogo casual premium.
