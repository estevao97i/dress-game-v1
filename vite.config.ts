import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base: caminho onde o app é servido no GitHub Pages (repo project site).
// Em dev fica '/', em produção '/dress-game-v1/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/dress-game-v1/' : '/',
  plugins: [react(), tailwindcss()],
}))
