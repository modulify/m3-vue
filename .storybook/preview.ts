import type { Preview, VueRenderer } from '@storybook/vue3'

import '../assets/stylesheets/normalize.scss'
import '../assets/stylesheets/index.scss'

import { withThemeByClassName } from '@storybook/addon-themes'

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName<VueRenderer>({
      themes: {
        light: 'm3-theme-light',
        dark: 'm3-theme-dark',
      },
      defaultTheme: 'light',
    }),
  ],
} as Preview
