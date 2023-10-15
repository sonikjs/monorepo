import mdx from '@mdx-js/rollup'
import preact from '@preact/preset-vite'
import sonik from 'sonik/vite'
import { defineConfig as defineViteConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'

const viteConfig = defineViteConfig({
  plugins: [
    sonik(),
    preact(),
    {
      ...mdx({
        jsxImportSource: 'preact',
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
