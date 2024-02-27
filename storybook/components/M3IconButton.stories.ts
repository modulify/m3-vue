import type { Meta, StoryObj } from '@storybook/vue3'

import { M3Icon } from '@/components/icon'
import { M3IconButton } from '@/components/icon-button'

const meta = {
  title: 'Components/M3IconButton',

  component: M3IconButton,

  argTypes: {
    appearance: {
      control: 'select',
      options: ['filled', 'outlined', 'standard', 'tonal'],
    },

    disabled: {
      control: 'boolean',
    },
  },

  args: {
    appearance: 'filled',
    disabled: false,
  },

  render: (args: unknown) => ({
    components: {
      M3Icon,
      M3IconButton,
    },

    setup () {
      return { args }
    },

    template: `
        <M3IconButton v-bind="args">
            <M3Icon name="favorite" />
        </M3IconButton>
    `,
  }),

  tags: ['autodocs'],

  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof M3IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const StandardButton: Story = {
  args: {
    appearance: 'standard',
  },
}

export const FilledButton: Story = {
  args: {
    appearance: 'filled',
  },
}

export const OutlinedButton: Story = {
  args: {
    appearance: 'outlined',
  },
}

export const TonalButton: Story = {
  args: {
    appearance: 'tonal',
  },
}
