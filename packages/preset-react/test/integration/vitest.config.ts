import mdx from '@mdx-js/rollup'
import sonik from 'sonik/vite'
import { defineConfig as defineViteConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'

const viteConfig = defineViteConfig({
  ssr: {
    external: ['react', 'react-dom'],
  },
  plugins: [
    sonik(),
    {
      ...mdx({
        jsxImportSource: 'react',
      }),
    },
  ],
})

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      server: {
        deps: {
          inline: [/^(?!.*vitest).*$/],
        },
      },
    },
  })
)
