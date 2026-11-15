import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Let GitHub Actions set BASE_PATH at build time:
// - for user/organization pages (<user>.github.io), BASE_PATH="/"
// - for project pages, BASE_PATH="/<repo>/"
// Local dev defaults to "/".
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
})
