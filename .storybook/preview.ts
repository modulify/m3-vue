import type { Preview } from '@storybook/vue3'

import '../assets/stylesheets/normalize.scss'
import '../assets/stylesheets/index.scss'

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#FEF7FF' },
        { name: 'dark', value: '#141218' },
      ],
    },
  },
} as Preview
