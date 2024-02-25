import type { Preview } from '@storybook/vue3'

import '../assets/stylesheets/normalize.scss'
import '../assets/stylesheets/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
