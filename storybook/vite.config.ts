import { defineConfig } from 'vite'
import common from '../vite.config.common'

export default defineConfig({
  ...common,

  server: {
    hmr: {
      clientPort: 80,
    },
  },
})
