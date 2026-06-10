/**
 * Exporta a personagem como PNG: serializa o SVG do palco,
 * desenha num canvas em alta resolução com fundo gradiente
 * e dispara o download.
 */
export async function exportCharacterPng(svgId = 'character-stage'): Promise<void> {
  const svg = document.getElementById(svgId) as unknown as SVGSVGElement | null
  if (!svg) return

  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const xml = new XMLSerializer().serializeToString(clone)
  const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }))

  try {
    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Falha ao carregar SVG'))
      img.src = url
    })

    const scale = 2 // alta resolução
    const w = 420 * scale
    const h = 680 * scale
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const g = canvas.getContext('2d')
    if (!g) return

    // fundo gradiente pastel
    const grad = g.createLinearGradient(0, 0, 0, h)
    grad.addColorStop(0, '#fde8f3')
    grad.addColorStop(0.6, '#f3e8ff')
    grad.addColorStop(1, '#e0f2fe')
    g.fillStyle = grad
    g.fillRect(0, 0, w, h)

    g.drawImage(img, 0, 0, w, h)

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'minha-personagem.png'
    a.click()
    URL.revokeObjectURL(a.href)
  } finally {
    URL.revokeObjectURL(url)
  }
}
