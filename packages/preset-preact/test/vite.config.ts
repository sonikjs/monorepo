import sonik from 'sonik/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    noExternal: true,
  },
  plugins: [
    sonik({
      entry: './test/app/server.ts',
    }),
  ],
})
