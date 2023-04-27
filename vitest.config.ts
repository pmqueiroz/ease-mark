import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      100: true,
      provider: 'c8',
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts', '**/*.{spec,types}.ts'],
    }
  },
})
