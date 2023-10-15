import sonik from 'sonik/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    external: ['react', 'react-dom'],
    noExternal: true,
  },
  plugins: [
    sonik({
      entry: './test/app/server.ts',
    }),
  ],
})
